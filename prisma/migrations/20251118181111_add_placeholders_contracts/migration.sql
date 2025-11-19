/*
  Warnings:

  - Added the required column `clientAddress` to the `ContractInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientPhone` to the `ContractInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `ContractInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planValue` to the `ContractInstance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContractInstance" ADD COLUMN     "clientAddress" TEXT NOT NULL,
ADD COLUMN     "clientPhone" TEXT NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "planValue" DECIMAL(10,2) NOT NULL;
