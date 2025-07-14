/*
  Warnings:

  - A unique constraint covering the columns `[dayOfWeek]` on the table `SlotTemplate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SlotTemplate_dayOfWeek_key" ON "SlotTemplate"("dayOfWeek");
