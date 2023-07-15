CREATE TABLE `users` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` text,
	`phone` text,
	`createdAt` timestamp DEFAULT (now())
);
--> statement-breakpoint
CREATE TABLE `authentication_codes` (
	`authentication_code` varchar(256) PRIMARY KEY NOT NULL,
	`user_id` int,
	`createdAt` timestamp DEFAULT (now()),
	`array` varchar(256)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` int,
	`createdAt` timestamp DEFAULT (now())
);
