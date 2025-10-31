import { db } from '$lib/server/db/index.js';
import { devlog, project } from '$lib/server/db/schema.js';
import { error, redirect } from '@sveltejs/kit';
import { eq, and } from 'drizzle-orm';
import type { Actions } from './$types';

export async function load({ params, locals }) {
	let id: number = parseInt(params.id);

	if (!locals.user) {
		throw error(500);
	}

	const queriedProject = await db
		.select()
		.from(project)
		.where(and(eq(project.id, id), eq(project.userId, locals.user.id), eq(project.deleted, false)))
		.get();

	if (!queriedProject) {
		throw error(404);
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

		const queriedProject = await db
			.select()
			.from(project)
			.where(
				and(eq(project.id, id), eq(project.userId, locals.user.id), eq(project.deleted, false))
			)
			.get();

		if (!queriedProject) {
			throw error(404);
		}

		await db
			.update(project)
			.set({
				deleted: true,
				updatedAt: new Date(Date.now())
			})
			.where(
				and(
					eq(project.id, queriedProject.id),
					eq(project.userId, locals.user.id),
					eq(project.deleted, false)
				)
			);

		await db.update(devlog).set({
			deleted: true,
		});

		return redirect(303, '/dashboard/projects');
	}
} satisfies Actions;
