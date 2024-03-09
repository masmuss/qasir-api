/*
  Warnings:

  - A unique constraint covering the columns `[firstName]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "lastName" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_firstName_key" ON "Customer"("firstName");
