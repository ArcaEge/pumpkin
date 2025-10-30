import { db } from '$lib/server/db/index.js';
import { project } from '$lib/server/db/schema.js';
import { error } from '@sveltejs/kit';
import { eq, and } from 'drizzle-orm';

export async function load({ locals }) {
	if (!locals.user) {
		throw error(500);
	}

	const projects = await db.select().from(project).where(and(eq(project.userId, locals.user.id), eq(project.deleted, false)));

	return {
		projects: projects.map((project) => {
			return {
				id: project.id,
				name: project.name,
				description: project.description,
				url: project.url,
				createdAt: project.createdAt
			};
		})
	};
}
