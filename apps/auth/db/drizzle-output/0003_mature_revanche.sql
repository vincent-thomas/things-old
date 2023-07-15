ALTER TABLE `authentication_codes` MODIFY COLUMN `authentication_code` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `sessions` MODIFY COLUMN `id` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `id` varchar(36) PRIMARY KEY NOT NULL;