/*
  Warnings:

  - You are about to drop the column `g` on the `Session` table. All the data in the column will be lost.
  - Added the required column `day` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "g",
ADD COLUMN     "day" "Day" NOT NULL;
