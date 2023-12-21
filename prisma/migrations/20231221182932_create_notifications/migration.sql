-- CreateTable
CREATE TABLE "activitiy_notifications" (
    "id" SERIAL NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "delayed" BOOLEAN NOT NULL DEFAULT false,
    "close_delayed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "activitiy_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "activity" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "activitiy_notifications" ADD CONSTRAINT "activitiy_notifications_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
