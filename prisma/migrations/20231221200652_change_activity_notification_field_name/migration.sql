/*
  Warnings:

  - You are about to drop the column `close_delayed` on the `activitiy_notifications` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[activity_id]` on the table `activitiy_notifications` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "activitiy_notifications" DROP COLUMN "close_delayed",
ADD COLUMN     "expired" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "activitiy_notifications_activity_id_key" ON "activitiy_notifications"("activity_id");
