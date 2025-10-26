import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: integer('id').primaryKey(), // User ID
	slackId: text('slack_id').notNull().unique(), // Slack ID
	profilePicture: text('profilePicture').notNull(), // Profile pic URL
	name: text('name').notNull(), // Username on Slack
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(new Date(Date.now())), // Account creation timestamp
	lastLoginAt: integer('last_login_at', { mode: 'timestamp' })
		.notNull()
		.default(new Date(Date.now())) // Last login timestamp
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const project = sqliteTable('project', {
	id: integer('id').primaryKey(),
	userId: integer('user_id')
	.notNull()
	.references(() => user.id),
	name: text('name'),
	description: text('description'),
	url: text('url'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(new Date(Date.now())),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(new Date(Date.now())),
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
