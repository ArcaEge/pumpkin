import { redirect, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db/index.js';
import { user } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export async function GET({ url, cookies }) {
	const urlState = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	if (!urlState || !code) {
		return error(418);
	}

	const cookieState = cookies.get('oauth_state');

	if (!cookieState || cookieState !== urlState) {
		var redirectURL = new URL(`${url.protocol}//${url.host}/auth/slack`);
		return redirect(302, redirectURL);
	}

	cookies.delete('oauth_state', { path: '/' });

	// Get token
	var openidConnectTokenURL = new URL('https://slack.com/api/openid.connect.token');
	openidConnectTokenURL.searchParams.set('code', code);
	openidConnectTokenURL.searchParams.set(
		'client_id',
		env.SLACK_CLIENT_ID ? env.SLACK_CLIENT_ID : ''
	);
	openidConnectTokenURL.searchParams.set(
		'client_secret',
		env.SLACK_CLIENT_SECRET ? env.SLACK_CLIENT_SECRET : ''
	);
	openidConnectTokenURL.searchParams.set('redirect_uri', `https://${url.host}/auth/callback`);

	const openidConnectTokenRes = await fetch(openidConnectTokenURL, {
		method: 'POST'
	});

	if (!openidConnectTokenRes.ok) {
		var redirectURL = new URL(`${url.protocol}//${url.host}/auth/slack`);
		return redirect(302, redirectURL);
	}

	let openidConnectTokenJSON = await openidConnectTokenRes.json();

	if (openidConnectTokenJSON['ok'] !== true) {
		var redirectURL = new URL(`${url.protocol}//${url.host}/auth/slack`);
		return redirect(302, redirectURL);
	}

	const token = openidConnectTokenJSON['access_token'];

	// Get user data
	var openidConnectDataURL = new URL('https://slack.com/api/openid.connect.userInfo');
	const openidConnectDataRes = await fetch(openidConnectDataURL, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	if (!openidConnectDataRes.ok) {
		var redirectURL = new URL(`${url.protocol}//${url.host}/auth/slack`);
		return redirect(302, redirectURL);
	}

	let openidConnectDataJSON = await openidConnectDataRes.json();

	if (openidConnectDataJSON['ok'] !== true) {
		var redirectURL = new URL(`${url.protocol}//${url.host}/auth/slack`);
		return redirect(302, redirectURL);
	}

	const slackID = openidConnectDataJSON['https://slack.com/user_id'];
	const profilePic = openidConnectDataJSON['picture'];
	const name = openidConnectDataJSON['given_name'];

	// TODO: Check Hackatime API if they're banned and identity if they're verified
	// https://identity.hackclub.com/api/external/check?slack_id=
	// https://hackatime.hackclub.com/api/v1/users/SLACK_ID/trust_factor
	console.log(slackID, profilePic);

	// Create user if doesn't exist
	const databaseUser = await db.select().from(user).where(eq(user.id, slackID)).get();

	if (databaseUser) {
		// Update user (update name and profile picture on login)
		await db.update(user).set({ name: name, profilePicture: profilePic }).where(eq(user.id, slackID));
	} else {
		// Create user
		await db.insert(user).values({ id: slackID, name: name, profilePicture: profilePic });
	}

	var redirectURL = new URL(`${url.protocol}//${url.host}/dashboard`);
	return redirect(302, redirectURL);
}
