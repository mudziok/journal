/*
  Warnings:

  - The primary key for the `badges` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "badges" DROP CONSTRAINT "badges_pkey",
ADD CONSTRAINT "badges_pkey" PRIMARY KEY ("name", "recipient_username", "awarded_at");
