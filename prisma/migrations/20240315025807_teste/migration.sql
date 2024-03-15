/*
  Warnings:

  - Added the required column `description` to the `Barbershop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Barbershop" ADD COLUMN     "description" TEXT NOT NULL;
