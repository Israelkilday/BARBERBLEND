/*
  Warnings:

  - Made the column `ratings` on table `Barbershop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stars` on table `Barbershop` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Barbershop" ALTER COLUMN "ratings" SET NOT NULL,
ALTER COLUMN "stars" SET NOT NULL;
