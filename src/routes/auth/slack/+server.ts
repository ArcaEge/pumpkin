import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';
import crypto from 'crypto';

export function GET({ url, cookies }) {
	const state = crypto.randomBytes(32).toString('hex');
	cookies.set('oauth_state', state, { path: '/', maxAge: 600 });

	var redirectURL = new URL('https://slack.com/openid/connect/authorize');
	redirectURL.searchParams.set('response_type', 'code');
	redirectURL.searchParams.set('scope', 'openid profile');
	redirectURL.searchParams.set('client_id', env.SLACK_CLIENT_ID ? env.SLACK_CLIENT_ID : ''); // Will be broken if not set
	redirectURL.searchParams.set('state', state);
	redirectURL.searchParams.set('team', env.SLACK_TEAM ? env.SLACK_TEAM : '');
	redirectURL.searchParams.set('redirect_uri', `https://${url.host}/auth/callback`);

	return redirect(302, redirectURL);
}
