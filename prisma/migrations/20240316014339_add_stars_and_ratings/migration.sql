/*
  Warnings:

  - Added the required column `ratings` to the `Barbershop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stars` to the `Barbershop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Barbershop" ADD COLUMN     "ratings" TEXT NULL,
ADD COLUMN     "stars" TEXT NULL;
