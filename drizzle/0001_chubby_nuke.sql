PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_project` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`name` text,
	`description` text,
	`url` text,
	`created_at` integer DEFAULT '"2025-10-26T19:42:41.246Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2025-10-26T19:42:41.246Z"' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_project`("id", "user_id", "name", "description", "url", "created_at", "updated_at") SELECT "id", "user_id", "name", "description", "url", "created_at", "updated_at" FROM `project`;--> statement-breakpoint
DROP TABLE `project`;--> statement-breakpoint
ALTER TABLE `__new_project` RENAME TO `project`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` integer PRIMARY KEY NOT NULL,
	`slack_id` text NOT NULL,
	`profilePicture` text NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT '"2025-10-26T19:42:41.245Z"' NOT NULL,
	`last_login_at` integer DEFAULT '"2025-10-26T19:42:41.245Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "slack_id", "profilePicture", "name", "created_at", "last_login_at") SELECT "id", "slack_id", "profilePicture", "name", "created_at", "last_login_at" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
CREATE UNIQUE INDEX `user_slack_id_unique` ON `user` (`slack_id`);