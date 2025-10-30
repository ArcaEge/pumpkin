CREATE TABLE `project` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`name` text,
	`description` text,
	`url` text,
	`created_at` integer DEFAULT '"2025-10-30T11:35:14.445Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2025-10-30T11:35:14.445Z"' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `project_audit_log` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`project_id` integer,
	`type` text NOT NULL,
	`name` text,
	`description` text,
	`url` text,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`project_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `session_audit_log` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`type` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY NOT NULL,
	`slack_id` text NOT NULL,
	`profilePicture` text NOT NULL,
	`name` text NOT NULL,
	`has_audit_logs` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT '"2025-10-30T11:35:14.444Z"' NOT NULL,
	`last_login_at` integer DEFAULT '"2025-10-30T11:35:14.444Z"' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_slack_id_unique` ON `user` (`slack_id`);