ALTER TABLE `users` ADD `is_active` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `users` ADD `password_changed` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `users` ADD `google_scholar` varchar(4045);--> statement-breakpoint
ALTER TABLE `users` ADD `research_gate` varchar(4045);