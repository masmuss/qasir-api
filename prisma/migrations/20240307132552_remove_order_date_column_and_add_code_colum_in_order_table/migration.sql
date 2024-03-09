/*
  Warnings:

  - You are about to drop the column `orderDate` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "orderDate",
ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_code_key" ON "Order"("code");
