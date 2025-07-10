/*
  Warnings:

  - The values [WORKING,MAINTENANCE,BROKEN] on the enum `EquipmentStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EquipmentStatus_new" AS ENUM ('working', 'maintenance', 'broken');
ALTER TABLE "Equipment" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Equipment" ALTER COLUMN "status" TYPE "EquipmentStatus_new" USING ("status"::text::"EquipmentStatus_new");
ALTER TYPE "EquipmentStatus" RENAME TO "EquipmentStatus_old";
ALTER TYPE "EquipmentStatus_new" RENAME TO "EquipmentStatus";
DROP TYPE "EquipmentStatus_old";
ALTER TABLE "Equipment" ALTER COLUMN "status" SET DEFAULT 'working';
COMMIT;

-- AlterTable
ALTER TABLE "Equipment" ALTER COLUMN "status" SET DEFAULT 'working';
