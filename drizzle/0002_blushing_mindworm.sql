ALTER TABLE `devlog` RENAME COLUMN "timestamp" TO "created_at";--> statement-breakpoint
ALTER TABLE `devlog` ADD `deleted` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `devlog` ADD `updated_at` integer NOT NULL;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_project` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`name` text,
	`description` text,
	`url` text,
	`status` text DEFAULT 'building' NOT NULL,
	`deleted` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT '"2025-10-31T01:05:51.417Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2025-10-31T01:05:51.417Z"' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_project`("id", "user_id", "name", "description", "url", "status", "deleted", "created_at", "updated_at") SELECT "id", "user_id", "name", "description", "url", "status", "deleted", "created_at", "updated_at" FROM `project`;--> statement-breakpoint
DROP TABLE `project`;--> statement-breakpoint
ALTER TABLE `__new_project` RENAME TO `project`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
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
	`created_at` integer DEFAULT '"2025-10-31T01:05:51.416Z"' NOT NULL,
	`last_login_at` integer DEFAULT '"2025-10-31T01:05:51.416Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "slack_id", "profilePicture", "name", "status", "has_session_audit_logs", "has_project_audit_logs", "has_t1_review", "has_t2_review", "created_at", "last_login_at") SELECT "id", "slack_id", "profilePicture", "name", "status", "has_session_audit_logs", "has_project_audit_logs", "has_t1_review", "has_t2_review", "created_at", "last_login_at" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
CREATE UNIQUE INDEX `user_slack_id_unique` ON `user` (`slack_id`);