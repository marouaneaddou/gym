/*
  Warnings:

  - You are about to drop the `SlotTemplate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSlot` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "enumTrainerSession" AS ENUM ('active', 'desactive');

-- DropForeignKey
ALTER TABLE "UserSlot" DROP CONSTRAINT "UserSlot_slotTemplateId_fkey";

-- DropForeignKey
ALTER TABLE "UserSlot" DROP CONSTRAINT "UserSlot_userId_fkey";

-- AlterTable
ALTER TABLE "TrainerSession" ADD COLUMN     "status" "enumTrainerSession" NOT NULL DEFAULT 'active';

-- DropTable
DROP TABLE "SlotTemplate";

-- DropTable
DROP TABLE "UserSlot";
