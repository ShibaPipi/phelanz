-- CreateTable
CREATE TABLE `SystemMenu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `parentId` INTEGER NOT NULL DEFAULT 0,
    `displayOrder` INTEGER NOT NULL,
    `path` VARCHAR(191) NULL,
    `route` VARCHAR(191) NULL,
    `queryString` VARCHAR(191) NULL,
    `isOuterLink` BOOLEAN NOT NULL,
    `type` ENUM('MENU', 'SUBMENU', 'BUTTON') NOT NULL,
    `visible` BOOLEAN NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL,
    `permission_tag` VARCHAR(191) NOT NULL DEFAULT '',
    `icon` VARCHAR(191) NOT NULL DEFAULT '',
    `creatorId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `SystemMenu_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
