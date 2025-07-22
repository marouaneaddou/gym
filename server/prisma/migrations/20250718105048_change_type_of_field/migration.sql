/*
  Warnings:

  - You are about to drop the column `day` on the `Session` table. All the data in the column will be lost.
  - Added the required column `g` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `startTime` on the `Session` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endTime` on the `Session` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "day",
ADD COLUMN     "g" "Day" NOT NULL,
DROP COLUMN "startTime",
ADD COLUMN     "startTime" INTEGER NOT NULL,
DROP COLUMN "endTime",
ADD COLUMN     "endTime" INTEGER NOT NULL;
