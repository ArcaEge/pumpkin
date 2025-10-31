import { db } from '$lib/server/db/index.js';
import { project, devlog } from '$lib/server/db/schema.js';
import { error, fail, redirect } from '@sveltejs/kit';
import { isValidUrl } from '$lib/utils';
import type { Actions } from './$types';
import { and, eq } from 'drizzle-orm';

export async function load({ params, locals }) {
	let id: number = parseInt(params.id);
	let devlogId: number = parseInt(params.devlog_id);

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

	const queriedDevlog = await db
		.select()
		.from(devlog)
		.where(
			and(eq(devlog.id, devlogId), eq(devlog.userId, locals.user.id), eq(devlog.deleted, false))
		)
		.get();

	if (!queriedDevlog) {
		throw error(404);
	}

	return {
		devlog: {
			id: queriedDevlog.id,
			description: queriedDevlog.description,
			timeSpent: queriedDevlog.timeSpent,
			createdAt: queriedDevlog.createdAt
		}
	};
}

export const actions = {
	default: async ({ request, locals, params }) => {
		if (!locals.user) {
			throw error(500);
		}

		let id: number = parseInt(params.id);
		let devlogId: number = parseInt(params.devlog_id);

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

		const queriedDevlog = await db
			.select()
			.from(devlog)
			.where(
				and(eq(devlog.id, devlogId), eq(devlog.userId, locals.user.id), eq(devlog.deleted, false))
			)
			.get();

		if (!queriedDevlog) {
			throw error(404);
		}

		const data = await request.formData();
		const description = data.get('description');

		if (
			!description ||
			description.toString().trim().length < 20 ||
			description.toString().trim().length > 1000
		) {
			return fail(400, {
				fields: { description },
				invalid_description: true
			});
		}

		await db
			.update(devlog)
			.set({
				description: description.toString(),
				updatedAt: new Date(Date.now())
			})
			.where(
				and(eq(devlog.id, devlogId), eq(devlog.userId, locals.user.id), eq(devlog.deleted, false))
			);

		return redirect(303, `/dashboard/projects/${id}`);
	}
} satisfies Actions;
