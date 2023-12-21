/*
  Warnings:

  - You are about to drop the column `close_delayed` on the `activitiy_notifications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "activitiy_notifications" DROP COLUMN "close_delayed",
ADD COLUMN     "expired" BOOLEAN NOT NULL DEFAULT false;
