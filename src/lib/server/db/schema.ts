import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: integer('id').primaryKey(), // User ID
	slackId: text('slack_id').notNull().unique(), // Slack ID
	profilePicture: text('profilePicture').notNull(), // Profile pic URL
	name: text('name').notNull(), // Username on Slack

	hasAuditLogs: integer('has_audit_logs', { mode: 'boolean' }).notNull().default(false), // Has access to audit logs

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

export const sessionAuditLog = sqliteTable('session_audit_log', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => user.id),
	type: text('type', { enum: ['login', 'logout', 'session_expire'] }).notNull(),
	timestamp: integer('expires_at', { mode: 'timestamp' }).notNull()
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
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(new Date(Date.now()))
});

export const projectAuditLog = sqliteTable('project_audit_log', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
	.notNull()
	.references(() => user.id),
	projectId: integer('project_id').references(() => user.id),
	type: text('type', { enum: ['create', 'update', 'delete'] }).notNull(),

	name: text('name'),
	description: text('description'),
	url: text('url'),

	timestamp: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type Project = typeof project.$inferSelect;

export type SessionAuditLog = typeof sessionAuditLog.$inferSelect;
export type ProjectAuditLog = typeof projectAuditLog.$inferSelect;
