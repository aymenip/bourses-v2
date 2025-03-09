ALTER TABLE `articles` DROP FOREIGN KEY `articles_documentId_documents_id_fk`;
--> statement-breakpoint
ALTER TABLE `books` DROP FOREIGN KEY `books_documentId_documents_id_fk`;
--> statement-breakpoint
ALTER TABLE `certeficates` DROP FOREIGN KEY `certeficates_documentId_documents_id_fk`;
--> statement-breakpoint
ALTER TABLE `conferencse` DROP FOREIGN KEY `conferencse_documentId_documents_id_fk`;
--> statement-breakpoint
ALTER TABLE `formSubmissions` DROP FOREIGN KEY `formSubmissions_userId_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `forms` DROP FOREIGN KEY `forms_creator_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `formsAccess` DROP FOREIGN KEY `formsAccess_formId_forms_id_fk`;
--> statement-breakpoint
ALTER TABLE `formsAccess` DROP FOREIGN KEY `formsAccess_roleId_roles_id_fk`;
--> statement-breakpoint
ALTER TABLE `logs` DROP FOREIGN KEY `logs_userId_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `forms` MODIFY COLUMN `title` varchar(1024) NOT NULL;--> statement-breakpoint
ALTER TABLE `articles` ADD CONSTRAINT `articles_documentId_documents_id_fk` FOREIGN KEY (`documentId`) REFERENCES `documents`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `books` ADD CONSTRAINT `books_documentId_documents_id_fk` FOREIGN KEY (`documentId`) REFERENCES `documents`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `certeficates` ADD CONSTRAINT `certeficates_documentId_documents_id_fk` FOREIGN KEY (`documentId`) REFERENCES `documents`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `conferencse` ADD CONSTRAINT `conferencse_documentId_documents_id_fk` FOREIGN KEY (`documentId`) REFERENCES `documents`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `formSubmissions` ADD CONSTRAINT `formSubmissions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `forms` ADD CONSTRAINT `forms_creator_users_id_fk` FOREIGN KEY (`creator`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `formsAccess` ADD CONSTRAINT `formsAccess_formId_forms_id_fk` FOREIGN KEY (`formId`) REFERENCES `forms`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `formsAccess` ADD CONSTRAINT `formsAccess_roleId_roles_id_fk` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `logs` ADD CONSTRAINT `logs_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;