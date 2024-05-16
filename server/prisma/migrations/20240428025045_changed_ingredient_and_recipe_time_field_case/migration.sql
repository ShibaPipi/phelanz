/*
  Warnings:

  - You are about to drop the column `created_at` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `assigned_at` on the `IngredientOnRecipe` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ingredient` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `IngredientOnRecipe` DROP COLUMN `assigned_at`,
    ADD COLUMN `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Recipe` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
