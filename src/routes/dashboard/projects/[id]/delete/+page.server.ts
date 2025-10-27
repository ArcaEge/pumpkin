import { db } from '$lib/server/db/index.js';
import { project } from '$lib/server/db/schema.js';
import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions } from './$types';

export async function load({ params, locals }) {
	let id: number = parseInt(params.id);

	if (!locals.user) {
		throw error(500);
	}

	const queriedProject = await db.select().from(project).where(eq(project.id, id)).get();

	if (!queriedProject) {
		throw error(404);
	}

	if (queriedProject.userId !== locals.user.id) {
		throw redirect(302, `/dashboard/projects/${id}`);
	}

	return {
		project: {
			id: queriedProject.id,
			name: queriedProject.name
		}
	};
}

export const actions = {
	default: async ({ locals, params }) => {
		if (!locals.user) {
			throw error(500);
		}

		let id: number = parseInt(params.id);

		const queriedProject = await db.select().from(project).where(eq(project.id, id)).get();

		if (queriedProject?.userId !== locals.user.id) {
			throw error(403, "imagine");
		}

		await db.delete(project).where(eq(project.id, id));

		return redirect(303, '/dashboard/projects');
	}
} satisfies Actions;
