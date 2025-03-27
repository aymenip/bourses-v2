ALTER TABLE `articles` ADD `userId` bigint unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `books` ADD `userId` bigint unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `certeficates` ADD `userId` bigint unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `conferencse` ADD `userId` bigint unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `articles` ADD CONSTRAINT `articles_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `books` ADD CONSTRAINT `books_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `certeficates` ADD CONSTRAINT `certeficates_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `conferencse` ADD CONSTRAINT `conferencse_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;