/*
  Warnings:

  - Added the required column `updatedAt` to the `TrainerSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrainerSession" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
