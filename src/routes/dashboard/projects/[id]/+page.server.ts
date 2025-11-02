import { db } from '$lib/server/db/index.js';
import { devlog, project } from '$lib/server/db/schema.js';
import { error, fail } from '@sveltejs/kit';
import { eq, and, desc, sql } from 'drizzle-orm';
import type { Actions } from './$types';
import { writeFile } from 'node:fs/promises';
import { extname } from 'path';
import {
	ALLOWED_IMAGE_TYPES,
	ALLOWED_MODEL_EXTS,
	ALLOWED_MODEL_TYPES,
	MAX_UPLOAD_SIZE
} from './config';
import sharp from 'sharp';

const DEVLOG_MIN_TIME = 5;
const DEVLOG_MAX_TIME = 120;

export async function load({ params }) {
	const id: number = parseInt(params.id);

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

		const id: number = parseInt(params.id);

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
		const imageFile = data.get('image') as File;
		const modelFile = data.get('model') as File;

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

		// Validate image
		if (!(imageFile instanceof File)) {
			return fail(400, {
				fields: { description, timeSpent },
				invalid_image_file: true
			});
		}

		if (imageFile.size > MAX_UPLOAD_SIZE) {
			return fail(400, {
				fields: { description, timeSpent },
				invalid_image_file: true
			});
		}

		if (!ALLOWED_IMAGE_TYPES.includes(imageFile.type)) {
			return fail(400, {
				fields: { description, timeSpent },
				invalid_image_file: true
			});
		}

		const imageFilename = `${process.env.UPLOADS_PATH ?? './uploads'}/images/${crypto.randomUUID()}${extname(imageFile.name)}`;

		// Validate model
		let modelFilename = null;

		if (modelFile.size) {
			if (modelFile.size > MAX_UPLOAD_SIZE) {
				return fail(400, {
					fields: { description, timeSpent },
					invalid_model_file: true
				});
			}

			if (
				!ALLOWED_MODEL_TYPES.includes(modelFile.type) ||
				!ALLOWED_MODEL_EXTS.includes(extname(modelFile.name))
			) {
				return fail(400, {
					fields: { description, timeSpent },
					invalid_model_file: true
				});
			}

			modelFilename = `${process.env.UPLOADS_PATH ?? './uploads'}/models/${crypto.randomUUID()}${extname(modelFile.name)}`;
			await writeFile(modelFilename, Buffer.from(await modelFile.arrayBuffer()));
		}

		// Remove Exif metadata and save (we don't want another Hack Club classic PII leak :D)
		const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
		await writeFile(imageFilename, await sharp(imageBuffer).toBuffer());

		await db.insert(devlog).values({
			userId: locals.user.id,
			projectId: queriedProject.id,
			description: description.toString().trim(),
			image: imageFilename,
			model: modelFilename,
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
		const diff = new Date(Date.now()).valueOf() - queriedDevlogArray[0].createdAt.valueOf();

		devlogCurrentMaxTime = Math.min(Math.floor(Math.abs(diff / 1000 / 60)), DEVLOG_MAX_TIME);
	}

	return devlogCurrentMaxTime;
}
