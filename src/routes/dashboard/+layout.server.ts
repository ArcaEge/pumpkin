import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
	if (!locals.user) {
		throw redirect(302, '/auth/slack');
	}

	return {
		user: {
			name: locals.user.name,
			profilePicture: locals.user.profilePicture,
		}
	};
}
