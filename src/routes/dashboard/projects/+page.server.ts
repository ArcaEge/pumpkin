import { db } from '$lib/server/db/index.js';
import { project, devlog } from '$lib/server/db/schema.js';
import { error } from '@sveltejs/kit';
import { eq, and, sql } from 'drizzle-orm';

export async function load({ locals }) {
	if (!locals.user) {
		throw error(500);
	}

	const projects = await db
		.select({
			project: project,
			timeSpent: sql<number>`COALESCE(SUM(${devlog.timeSpent}), 0)`
		})
		.from(project)
		.leftJoin(devlog, and(eq(project.id, devlog.projectId), eq(devlog.deleted, false)))
		.where(and(eq(project.userId, locals.user.id), eq(project.deleted, false)))
		.groupBy(project.id);

	return {
		projects: projects.map((project) => {
			return {
				id: project.project.id,
				name: project.project.name,
				description: project.project.description,
				url: project.project.url,
				createdAt: project.project.createdAt,
				timeSpent: project.timeSpent
			};
		})
	};
}
