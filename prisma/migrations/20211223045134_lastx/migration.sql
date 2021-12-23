/*
  Warnings:

  - You are about to drop the `Order_Body` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Order_Body";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "OrderBody" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_order" INTEGER NOT NULL,
    "product" TEXT NOT NULL,
    "price" INTEGER NOT NULL
);
