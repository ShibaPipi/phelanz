/*
  Warnings:

  - You are about to drop the column `name` on the `Banner` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Banner_name_key` ON `Banner`;

-- AlterTable
ALTER TABLE `Banner` DROP COLUMN `name`,
    ADD COLUMN `title` VARCHAR(191) NULL;
