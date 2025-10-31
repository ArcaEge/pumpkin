import { db } from '$lib/server/db/index.js';
import { project } from '$lib/server/db/schema.js';
import { error, fail, redirect } from '@sveltejs/kit';
import { isValidUrl } from '$lib/utils';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) {
			throw error(500);
		}

		const data = await request.formData();

		const name = data.get('name');
		const description = data.get('description');
		const url = data.get('url');

		if (!(name && name.toString().trim().length > 0 && name.toString().trim().length < 80)) {
			return fail(400, {
				fields: { name, description, url },
				invalid_name: true
			});
		}

		if (!(!description || description.toString().trim().length < 1000)) {
			return fail(400, {
				fields: { name, description, url },
				invalid_description: true
			});
		}

		if (!(!url || (url.toString().trim().length < 8000 && isValidUrl(url.toString().trim())))) {
			return fail(400, {
				fields: { name, description, url },
				invalid_url: true
			});
		}

		const [addedProject] = await db
			.insert(project)
			.values({
				name: name.toString().trim(),
				description: description?.toString().trim(),
				url: url?.toString().trim(),
				userId: locals.user.id,
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now())
			})
			.returning();

		return redirect(303, `/dashboard/projects/${addedProject.id}`);
	}
} satisfies Actions;
