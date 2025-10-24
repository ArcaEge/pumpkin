PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` integer PRIMARY KEY NOT NULL,
	`slack_id` text NOT NULL,
	`profilePicture` text NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT '"2025-10-24T14:49:14.618Z"' NOT NULL,
	`last_login_at` integer DEFAULT '"2025-10-24T14:49:14.618Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "slack_id", "profilePicture", "name", "created_at", "last_login_at") SELECT "id", "slack_id", "profilePicture", "name", "created_at", "last_login_at" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `user_slack_id_unique` ON `user` (`slack_id`);