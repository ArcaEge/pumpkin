import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
	if (!locals.user) {
		throw redirect(302, '/auth/slack');
	}

	return {
		user: {
			id: locals.user.id,
			slackId: locals.user.slackId,
			name: locals.user.name,
			profilePicture: locals.user.profilePicture,
		}
	};
}
