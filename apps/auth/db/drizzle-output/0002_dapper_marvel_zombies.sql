ALTER TABLE `sessions` MODIFY COLUMN `id` varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `id`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `phone`;