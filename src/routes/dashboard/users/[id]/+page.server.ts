import { db } from '$lib/server/db/index.js';
import { user } from '$lib/server/db/schema.js';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function load({ locals, params }) {
    let id: number = parseInt(params.id);

    const requestedUser = await db.select().from(user).where(eq(user.id, id)).get();

    if (!requestedUser) {
        throw error(404);
    }

    return {
        requestedUser: {
            id: requestedUser.id,
            slackId: requestedUser.slackId,
            profilePicture: requestedUser.profilePicture,
            name: requestedUser.name,
            createdAt: requestedUser.createdAt,
            lastLoginAt: requestedUser.id === locals.user?.id ? requestedUser.lastLoginAt : null,
        }
    }
};