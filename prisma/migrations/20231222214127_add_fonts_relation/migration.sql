-- AddForeignKey
ALTER TABLE "initiatives" ADD CONSTRAINT "initiatives_font_id_fkey" FOREIGN KEY ("font_id") REFERENCES "fonts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
