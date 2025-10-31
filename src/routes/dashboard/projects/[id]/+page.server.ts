import { db } from '$lib/server/db/index.js';
import { devlog, project } from '$lib/server/db/schema.js';
import { error, fail, redirect } from '@sveltejs/kit';
import { eq, and, desc } from 'drizzle-orm';
import type { Actions } from './$types';

export async function load({ params }) {
	let id: number = parseInt(params.id);

	const queriedProject = await db
		.select()
		.from(project)
		.where(and(eq(project.id, id), eq(project.deleted, false)))
		.get();

	if (!queriedProject) {
		throw error(404);
	}

	const devlogs = await db
		.select()
		.from(devlog)
		.where(and(eq(devlog.projectId, queriedProject.id), eq(devlog.deleted, false)));

	return {
		project: {
			id: queriedProject.id,
			userId: queriedProject.userId,
			name: queriedProject.name,
			description: queriedProject.description,
			url: queriedProject.url,
			createdAt: queriedProject.createdAt
		},
		devlogs: devlogs.map((devlog) => {
			return {
				id: devlog.id,
				description: devlog.description,
				timeSpent: devlog.timeSpent,
				createdAt: devlog.createdAt,
			};
		})
	};
}

export const actions = {
	default: async ({ request, locals, params }) => {
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

		const data = await request.formData();
		const description = data.get('description');

		if (
			!description ||
			description.toString().length < 20 ||
			description.toString().length > 1000
		) {
			return fail(400, {
				fields: { description },
				invalid_description: true
			});
		}

		await db.insert(devlog).values({
			userId: locals.user.id,
			projectId: queriedProject.id,
			description: description.toString(),
			timeSpent: 60,
			createdAt: new Date(Date.now()),
			updatedAt: new Date(Date.now())
		});

		return { success: true };
	}
} satisfies Actions;
