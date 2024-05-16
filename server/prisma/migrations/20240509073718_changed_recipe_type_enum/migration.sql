/*
  Warnings:

  - The values [VEGETABLE_ADN_MEAT] on the enum `Recipe_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Recipe` MODIFY `type` ENUM('VEGETABLE', 'MEAT', 'VEGETABLE_AND_MEAT', 'FRUIT', 'GRAIN') NOT NULL;
