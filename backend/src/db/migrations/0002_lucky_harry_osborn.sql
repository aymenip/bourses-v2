ALTER TABLE `documents` MODIFY COLUMN `type` varchar(5);--> statement-breakpoint
ALTER TABLE `documents` ADD `path` varchar(2048);