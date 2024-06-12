/*
  Warnings:

  - Added the required column `buttonTarget` to the `CmsIntroduction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CmsIntroduction` ADD COLUMN `button` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `buttonHref` VARCHAR(191) NULL,
    ADD COLUMN `buttonTarget` ENUM('SELF', 'BLANK') NOT NULL,
    ADD COLUMN `buttonText` VARCHAR(191) NULL,
    ADD COLUMN `tag` VARCHAR(191) NULL;
