/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `contentCategoryId` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Content` DROP FOREIGN KEY `Content_categoryId_fkey`;

-- AlterTable
ALTER TABLE `Content` DROP COLUMN `categoryId`,
    ADD COLUMN `contentCategoryId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Category`;

-- CreateTable
CREATE TABLE `ContentCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `parentId` INTEGER NOT NULL DEFAULT 0,
    `displayOrder` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `creatorId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ContentCategory_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Content` ADD CONSTRAINT `Content_contentCategoryId_fkey` FOREIGN KEY (`contentCategoryId`) REFERENCES `ContentCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
