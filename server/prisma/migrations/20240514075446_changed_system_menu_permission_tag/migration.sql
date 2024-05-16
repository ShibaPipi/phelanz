/*
  Warnings:

  - You are about to drop the column `permission_tag` on the `SystemMenu` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `SystemMenu` DROP COLUMN `permission_tag`,
    ADD COLUMN `permissionTag` VARCHAR(191) NOT NULL DEFAULT '';
