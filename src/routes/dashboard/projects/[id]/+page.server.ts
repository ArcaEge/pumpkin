import { db } from '$lib/server/db/index.js';
import { devlog, project } from '$lib/server/db/schema.js';
import { error, fail } from '@sveltejs/kit';
import { eq, and, desc, sum, sql } from 'drizzle-orm';
import type { Actions } from './$types';

const DEVLOG_MIN_TIME = 5;
const DEVLOG_MAX_TIME = 120;

export async function load({ params }) {
	let id: number = parseInt(params.id);

	const queriedProject = await db
		.select({
			project: project,
			timeSpent: sql<number>`COALESCE(SUM(${devlog.timeSpent}), 0)`,
			lastUpdated: sql<Date>`CASE
      WHEN MAX(${devlog.createdAt}) IS NULL THEN ${project.updatedAt}
      WHEN MAX(${devlog.createdAt}) > ${project.updatedAt} THEN MAX(${devlog.createdAt})
      ELSE ${project.updatedAt}
    END`
		})
		.from(project)
		.leftJoin(devlog, and(eq(project.id, devlog.projectId), eq(devlog.deleted, false)))
		.where(and(eq(project.id, id), eq(project.deleted, false)))
		.groupBy(project.id)
		.get();

	if (!queriedProject) {
		throw error(404);
	}

	const devlogs = await db
		.select()
		.from(devlog)
		.where(and(eq(devlog.projectId, queriedProject.project.id), eq(devlog.deleted, false)))
		.orderBy(desc(devlog.createdAt));

	return {
		project: {
			id: queriedProject.project.id,
			userId: queriedProject.project.userId,
			name: queriedProject.project.name,
			description: queriedProject.project.description,
			url: queriedProject.project.url,
			createdAt: queriedProject.project.createdAt,
			timeSpent: queriedProject.timeSpent,
			lastUpdated: queriedProject.lastUpdated
		},
		devlogs: devlogs.map((devlog) => {
			return {
				id: devlog.id,
				description: devlog.description,
				timeSpent: devlog.timeSpent,
				createdAt: devlog.createdAt
			};
		}),
		validationConstraints: {
			timeSpent: {
				min: DEVLOG_MIN_TIME,
				max: DEVLOG_MAX_TIME,
				currentMax: await getMaxDevlogTime(id)
			}
		}
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
		const timeSpent = data.get('timeSpent');

		if (
			!description ||
			description.toString().trim().length < 20 ||
			description.toString().trim().length > 1000
		) {
			return fail(400, {
				fields: { description, timeSpent },
				invalid_description: true
			});
		}

		if (
			!timeSpent ||
			!parseInt(timeSpent.toString()) ||
			parseInt(timeSpent.toString()) < DEVLOG_MIN_TIME ||
			parseInt(timeSpent.toString()) > (await getMaxDevlogTime(id))
		) {
			return fail(400, {
				fields: { description, timeSpent },
				invalid_timeSpent: true
			});
		}

		await db.insert(devlog).values({
			userId: locals.user.id,
			projectId: queriedProject.id,
			description: description.toString().trim(),
			timeSpent: parseInt(timeSpent.toString()),
			createdAt: new Date(Date.now()),
			updatedAt: new Date(Date.now())
		});

		return { success: true };
	}
} satisfies Actions;

async function getMaxDevlogTime(id: number) {
	const queriedDevlogArray = await db
		.select()
		.from(devlog)
		.where(and(eq(devlog.projectId, id), eq(devlog.deleted, false)))
		.orderBy(desc(devlog.createdAt))
		.limit(1);

	let devlogCurrentMaxTime;

	if (queriedDevlogArray.length == 0) {
		devlogCurrentMaxTime = DEVLOG_MAX_TIME;
	} else {
		let diff = new Date(Date.now()).valueOf() - queriedDevlogArray[0].createdAt.valueOf();

		devlogCurrentMaxTime = Math.min(Math.floor(Math.abs(diff / 1000 / 60)), DEVLOG_MAX_TIME);
	}

	return devlogCurrentMaxTime;
}
