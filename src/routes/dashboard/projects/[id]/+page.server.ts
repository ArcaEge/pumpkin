import { db } from '$lib/server/db/index.js';
import { project } from '$lib/server/db/schema.js';
import { error } from '@sveltejs/kit';
import { eq, and } from 'drizzle-orm';

export async function load({ params }) {
	let id: number = parseInt(params.id);

	const queriedProject = await db.select().from(project).where(and(eq(project.id, id), eq(project.deleted, false))).get();

	if (!queriedProject) {
		throw error(404);
	}

	return {
		project: {
			id: queriedProject.id,
			userId: queriedProject.userId,
			name: queriedProject.name,
			description: queriedProject.description,
			url: queriedProject.url,
			createdAt: queriedProject.createdAt
		}
	};
}
