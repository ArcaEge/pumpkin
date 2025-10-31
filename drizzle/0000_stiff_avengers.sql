CREATE TABLE `devlog` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` integer,
	`project_id` integer NOT NULL,
	`description` text NOT NULL,
	`time_spent` integer NOT NULL,
	`timestamp` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `project` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`name` text,
	`description` text,
	`url` text,
	`status` text DEFAULT 'building' NOT NULL,
	`deleted` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT '"2025-10-30T23:10:30.599Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2025-10-30T23:10:30.599Z"' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `project_audit_log` (
	`id` text PRIMARY KEY NOT NULL,
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
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `session_audit_log` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`type` text NOT NULL,
	`timestamp` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `t1_review` (
	`id` text PRIMARY KEY NOT NULL,
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
CREATE TABLE `t2_review` (
	`id` text PRIMARY KEY NOT NULL,
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
CREATE TABLE `user` (
	`id` integer PRIMARY KEY NOT NULL,
	`slack_id` text NOT NULL,
	`profilePicture` text NOT NULL,
	`name` text NOT NULL,
	`status` text DEFAULT 'default' NOT NULL,
	`has_session_audit_logs` integer DEFAULT false NOT NULL,
	`has_project_audit_logs` integer DEFAULT false NOT NULL,
	`has_t1_review` integer DEFAULT false NOT NULL,
	`has_t2_review` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT '"2025-10-30T23:10:30.598Z"' NOT NULL,
	`last_login_at` integer DEFAULT '"2025-10-30T23:10:30.598Z"' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_slack_id_unique` ON `user` (`slack_id`);