/*
  Warnings:

  - Added the required column `isVip` to the `UserSlot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSlot" ADD COLUMN     "isVip" BOOLEAN NOT NULL;
