CREATE TABLE IF NOT EXISTS `admins` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`firstname` varchar(256) NOT NULL,
	`lastname` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`password` varchar(256) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`permissionId` bigint unsigned NOT NULL,
	CONSTRAINT `admins_id` PRIMARY KEY(`id`),
	CONSTRAINT `admins_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `employees` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`highPostion` boolean NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`userId` bigint unsigned NOT NULL,
	CONSTRAINT `employees_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `forms` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`title` varchar(1024),
	`creator` bigint unsigned NOT NULL,
	CONSTRAINT `forms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `formsAccess` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`formId` bigint unsigned NOT NULL,
	`roleId` bigint unsigned NOT NULL,
	CONSTRAINT `formsAccess_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `logs` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`details` text,
	`userId` bigint unsigned NOT NULL,
	CONSTRAINT `logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `permissions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`code` varchar(256) NOT NULL,
	`title` varchar(256) NOT NULL,
	CONSTRAINT `permissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `positions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `positions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `roles` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`code` varchar(256) NOT NULL,
	`title` varchar(256) NOT NULL,
	CONSTRAINT `roles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `students` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`userId` bigint unsigned NOT NULL,
	CONSTRAINT `students_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `teachers` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`highPostion` boolean NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`userId` bigint unsigned NOT NULL,
	`positionId` bigint unsigned NOT NULL,
	CONSTRAINT `teachers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `users` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`firstname` varchar(256) NOT NULL,
	`lastname` varchar(256) NOT NULL,
	`dob` date,
	`matrialStatus` enum('متزوج','أعزب'),
	`age` int,
	`email` varchar(256) NOT NULL,
	`password` varchar(256) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`roleId` bigint unsigned NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `admins` ADD CONSTRAINT `admins_permissionId_permissions_id_fk` FOREIGN KEY (`permissionId`) REFERENCES `permissions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `employees` ADD CONSTRAINT `employees_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `forms` ADD CONSTRAINT `forms_creator_users_id_fk` FOREIGN KEY (`creator`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `formsAccess` ADD CONSTRAINT `formsAccess_formId_forms_id_fk` FOREIGN KEY (`formId`) REFERENCES `forms`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `formsAccess` ADD CONSTRAINT `formsAccess_roleId_roles_id_fk` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `logs` ADD CONSTRAINT `logs_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `students` ADD CONSTRAINT `students_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `teachers` ADD CONSTRAINT `teachers_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `teachers` ADD CONSTRAINT `teachers_positionId_positions_id_fk` FOREIGN KEY (`positionId`) REFERENCES `positions`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_roleId_roles_id_fk` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE no action ON UPDATE no action;