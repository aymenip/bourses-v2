CREATE TABLE `theses` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`documentId` bigint unsigned NOT NULL,
	`title` varchar(255) NOT NULL,
	`isSupervisor` boolean NOT NULL DEFAULT false,
	`isCosupervisor` boolean NOT NULL DEFAULT false,
	`year` year NOT NULL,
	`type` enum('PhD','Master','License') NOT NULL,
	`userId` bigint unsigned NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `theses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `sourceableFields` MODIFY COLUMN `type` enum('certificate','book','article','conference','thesis');--> statement-breakpoint
ALTER TABLE `theses` ADD CONSTRAINT `theses_documentId_documents_id_fk` FOREIGN KEY (`documentId`) REFERENCES `documents`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `theses` ADD CONSTRAINT `theses_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;