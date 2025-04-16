ALTER TABLE `sourceableFields` RENAME COLUMN `fieldId` TO `blockId`;--> statement-breakpoint
ALTER TABLE `typedFields` RENAME COLUMN `fieldId` TO `blockId`;--> statement-breakpoint
ALTER TABLE `sourceableFields` DROP FOREIGN KEY `sourceableFields_fieldId_fields_id_fk`;
--> statement-breakpoint
ALTER TABLE `typedFields` DROP FOREIGN KEY `typedFields_fieldId_fields_id_fk`;
--> statement-breakpoint
ALTER TABLE `sourceableFields` ADD CONSTRAINT `sourceableFields_blockId_fields_id_fk` FOREIGN KEY (`blockId`) REFERENCES `fields`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `typedFields` ADD CONSTRAINT `typedFields_blockId_fields_id_fk` FOREIGN KEY (`blockId`) REFERENCES `fields`(`id`) ON DELETE cascade ON UPDATE no action;