/*
  Warnings:

  - You are about to drop the column `expires` on the `badges` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "badges" DROP COLUMN "expires",
ADD COLUMN     "awarded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
