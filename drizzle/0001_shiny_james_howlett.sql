CREATE TABLE `rfid_credentials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`uid` varchar(32) NOT NULL,
	`label` varchar(128),
	`isActive` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `rfid_credentials_id` PRIMARY KEY(`id`),
	CONSTRAINT `rfid_credentials_uid_unique` UNIQUE(`uid`)
);
--> statement-breakpoint
CREATE TABLE `sensor_calibration` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sensorName` varchar(64) NOT NULL,
	`pin` varchar(8) NOT NULL,
	`ldrThresholdOn` int DEFAULT 150,
	`ldrThresholdOff` int DEFAULT 250,
	`delayAlarmSeconds` int DEFAULT 5,
	`timeoutRfidSeconds` int DEFAULT 10,
	`calibrationDate` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sensor_calibration_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `system_config` (
	`id` int AUTO_INCREMENT NOT NULL,
	`configKey` varchar(64) NOT NULL,
	`configValue` text NOT NULL,
	`description` text,
	`dataType` enum('string','number','boolean','json') DEFAULT 'string',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `system_config_id` PRIMARY KEY(`id`),
	CONSTRAINT `system_config_configKey_unique` UNIQUE(`configKey`)
);
--> statement-breakpoint
CREATE TABLE `system_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`eventType` enum('armed','disarmed','intrusion_detected','sensor_error','rfid_auth_success','rfid_auth_failed','alarm_triggered','alarm_disabled','system_startup','system_shutdown') NOT NULL,
	`state` enum('0','1','2','3','4','5','6') NOT NULL,
	`sensorData` text,
	`description` text,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `system_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `rfid_credentials` ADD CONSTRAINT `rfid_credentials_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `system_logs` ADD CONSTRAINT `system_logs_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;