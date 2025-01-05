ALTER TABLE `fields` DROP FOREIGN KEY `fields_formId_forms_id_fk`;
--> statement-breakpoint
ALTER TABLE `sourceableFields` DROP FOREIGN KEY `sourceableFields_fieldId_fields_id_fk`;
--> statement-breakpoint
ALTER TABLE `typedFields` DROP FOREIGN KEY `typedFields_fieldId_fields_id_fk`;
--> statement-breakpoint
ALTER TABLE `fields` ADD CONSTRAINT `fields_formId_forms_id_fk` FOREIGN KEY (`formId`) REFERENCES `forms`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sourceableFields` ADD CONSTRAINT `sourceableFields_fieldId_fields_id_fk` FOREIGN KEY (`fieldId`) REFERENCES `fields`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `typedFields` ADD CONSTRAINT `typedFields_fieldId_fields_id_fk` FOREIGN KEY (`fieldId`) REFERENCES `fields`(`id`) ON DELETE cascade ON UPDATE no action;