CREATE TABLE `files` (
	`id` varchar(14) PRIMARY KEY NOT NULL,
	`filename` varchar(36) NOT NULL,
	`ownedById` varchar(36) NOT NULL,
	`fileType` varchar(3) NOT NULL,
	`encryptionKey` binary(32) NOT NULL,
	`parentFolderId` varchar(36),
	`createdAt` timestamp NOT NULL DEFAULT (now())
);
--> statement-breakpoint
CREATE TABLE `folders` (
	`id` varchar(14) PRIMARY KEY NOT NULL,
	`folderName` varchar(36) NOT NULL,
	`ownedById` varchar(36) NOT NULL,
	`parentFolderId` varchar(36),
	`createdAt` timestamp NOT NULL DEFAULT (now())
);
--> statement-breakpoint
CREATE UNIQUE INDEX `folder_name` ON `folders` (`folderName`,`parentFolderId`);