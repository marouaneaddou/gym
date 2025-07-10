-- CreateTable
CREATE TABLE "Plans" (
    "id" SERIAL NOT NULL,
    "duration" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "max_days_per_week" INTEGER NOT NULL,
    "is_vip" BOOLEAN NOT NULL DEFAULT false,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Plans_pkey" PRIMARY KEY ("id")
);
