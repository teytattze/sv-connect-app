/*
  Warnings:

  - You are about to drop the column `invitee_id` on the `invitations` table. All the data in the column will be lost.
  - You are about to drop the column `inviter_id` on the `invitations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `invitations` DROP FOREIGN KEY `invitations_invitee_id_fkey`;

-- DropForeignKey
ALTER TABLE `invitations` DROP FOREIGN KEY `invitations_inviter_id_fkey`;

-- AlterTable
ALTER TABLE `invitations` DROP COLUMN `invitee_id`,
    DROP COLUMN `inviter_id`,
    ADD COLUMN `student_id` VARCHAR(191) NULL,
    ADD COLUMN `supervisor_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `invitations` ADD CONSTRAINT `invitations_supervisor_id_fkey` FOREIGN KEY (`supervisor_id`) REFERENCES `supervisors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invitations` ADD CONSTRAINT `invitations_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
