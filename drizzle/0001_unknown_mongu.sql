PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_devlog` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer,
	`project_id` integer NOT NULL,
	`description` text NOT NULL,
	`time_spent` integer NOT NULL,
	`timestamp` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_devlog`("id", "user_id", "project_id", "description", "time_spent", "timestamp") SELECT "id", "user_id", "project_id", "description", "time_spent", "timestamp" FROM `devlog`;--> statement-breakpoint
DROP TABLE `devlog`;--> statement-breakpoint
ALTER TABLE `__new_devlog` RENAME TO `devlog`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_project` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`name` text,
	`description` text,
	`url` text,
	`status` text DEFAULT 'building' NOT NULL,
	`deleted` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT '"2025-10-30T23:17:46.232Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2025-10-30T23:17:46.232Z"' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_project`("id", "user_id", "name", "description", "url", "status", "deleted", "created_at", "updated_at") SELECT "id", "user_id", "name", "description", "url", "status", "deleted", "created_at", "updated_at" FROM `project`;--> statement-breakpoint
DROP TABLE `project`;--> statement-breakpoint
ALTER TABLE `__new_project` RENAME TO `project`;--> statement-breakpoint
CREATE TABLE `__new_project_audit_log` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`action_user_id` integer NOT NULL,
	`project_id` integer NOT NULL,
	`type` text NOT NULL,
	`name` text,
	`description` text,
	`url` text,
	`timestamp` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`action_user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_project_audit_log`("id", "user_id", "action_user_id", "project_id", "type", "name", "description", "url", "timestamp") SELECT "id", "user_id", "action_user_id", "project_id", "type", "name", "description", "url", "timestamp" FROM `project_audit_log`;--> statement-breakpoint
DROP TABLE `project_audit_log`;--> statement-breakpoint
ALTER TABLE `__new_project_audit_log` RENAME TO `project_audit_log`;--> statement-breakpoint
CREATE TABLE `__new_t1_review` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`project_id` integer NOT NULL,
	`feedback` text,
	`notes` text,
	`action` text NOT NULL,
	`timestamp` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_t1_review`("id", "user_id", "project_id", "feedback", "notes", "action", "timestamp") SELECT "id", "user_id", "project_id", "feedback", "notes", "action", "timestamp" FROM `t1_review`;--> statement-breakpoint
DROP TABLE `t1_review`;--> statement-breakpoint
ALTER TABLE `__new_t1_review` RENAME TO `t1_review`;--> statement-breakpoint
CREATE TABLE `__new_t2_review` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`project_id` integer NOT NULL,
	`feedback` text,
	`notes` text,
	`multiplier` real DEFAULT 1 NOT NULL,
	`timestamp` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_t2_review`("id", "user_id", "project_id", "feedback", "notes", "multiplier", "timestamp") SELECT "id", "user_id", "project_id", "feedback", "notes", "multiplier", "timestamp" FROM `t2_review`;--> statement-breakpoint
DROP TABLE `t2_review`;--> statement-breakpoint
ALTER TABLE `__new_t2_review` RENAME TO `t2_review`;--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` integer PRIMARY KEY NOT NULL,
	`slack_id` text NOT NULL,
	`profilePicture` text NOT NULL,
	`name` text NOT NULL,
	`status` text DEFAULT 'default' NOT NULL,
	`has_session_audit_logs` integer DEFAULT false NOT NULL,
	`has_project_audit_logs` integer DEFAULT false NOT NULL,
	`has_t1_review` integer DEFAULT false NOT NULL,
	`has_t2_review` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT '"2025-10-30T23:17:46.231Z"' NOT NULL,
	`last_login_at` integer DEFAULT '"2025-10-30T23:17:46.231Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "slack_id", "profilePicture", "name", "status", "has_session_audit_logs", "has_project_audit_logs", "has_t1_review", "has_t2_review", "created_at", "last_login_at") SELECT "id", "slack_id", "profilePicture", "name", "status", "has_session_audit_logs", "has_project_audit_logs", "has_t1_review", "has_t2_review", "created_at", "last_login_at" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
CREATE UNIQUE INDEX `user_slack_id_unique` ON `user` (`slack_id`);