-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "discountPercentage" DROP NOT NULL,
ALTER COLUMN "discountPercentage" SET DEFAULT 0;
