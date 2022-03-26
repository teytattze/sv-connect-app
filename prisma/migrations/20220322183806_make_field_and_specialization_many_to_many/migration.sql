/*
  Warnings:

  - You are about to drop the column `field_id` on the `specializations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `specializations` DROP FOREIGN KEY `specializations_field_id_fkey`;

-- AlterTable
ALTER TABLE `specializations` DROP COLUMN `field_id`;

-- CreateTable
CREATE TABLE `_FieldToSpecialization` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_FieldToSpecialization_AB_unique`(`A`, `B`),
    INDEX `_FieldToSpecialization_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_FieldToSpecialization` ADD FOREIGN KEY (`A`) REFERENCES `fields`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FieldToSpecialization` ADD FOREIGN KEY (`B`) REFERENCES `specializations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
