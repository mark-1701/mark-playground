/*
  Warnings:

  - The values [PRIVATE,PUBLIC] on the enum `MediaStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MediaStatus_new" AS ENUM ('ATTACHED', 'DRAFT', 'ORPHAN', 'DELETED');
ALTER TABLE "public"."Media" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Media" ALTER COLUMN "status" TYPE "MediaStatus_new" USING ("status"::text::"MediaStatus_new");
ALTER TYPE "MediaStatus" RENAME TO "MediaStatus_old";
ALTER TYPE "MediaStatus_new" RENAME TO "MediaStatus";
DROP TYPE "public"."MediaStatus_old";
ALTER TABLE "Media" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;
