ALTER TABLE `authentication_codes` RENAME COLUMN `array` TO `scopes`;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `authentication_codes` MODIFY COLUMN `authentication_code` varchar(32) NOT NULL;--> statement-breakpoint
ALTER TABLE `authentication_codes` MODIFY COLUMN `user_id` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `authentication_codes` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `authentication_codes` MODIFY COLUMN `expires` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `authentication_codes` MODIFY COLUMN `scopes` varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE `sessions` MODIFY COLUMN `id` varchar(32) NOT NULL;--> statement-breakpoint
ALTER TABLE `sessions` MODIFY COLUMN `user_id` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `sessions` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `users` ADD `password` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `encryptionKey` binary(32) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `email` text NOT NULL;--> statement-breakpoint
ALTER TABLE `sessions` ADD `expires` timestamp NOT NULL;