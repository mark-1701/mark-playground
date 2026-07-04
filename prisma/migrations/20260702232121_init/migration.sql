-- CreateEnum
CREATE TYPE "MediaStatus" AS ENUM ('DRAFT', 'ATTACHED', 'ORPHAN');

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "status" "MediaStatus" NOT NULL DEFAULT 'DRAFT',
    "r2Key" TEXT NOT NULL,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Media_r2Key_key" ON "Media"("r2Key");
