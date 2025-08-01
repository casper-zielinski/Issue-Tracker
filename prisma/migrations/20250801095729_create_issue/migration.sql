-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('CLOSED', 'OPEN', 'IN_PROGRESS');

-- CreateEnum
CREATE TYPE "public"."Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateTable
CREATE TABLE "public"."Issue" (
    "id" SERIAL NOT NULL,
    "Title" VARCHAR(250) NOT NULL,
    "Issue" TEXT NOT NULL,
    "Status" "public"."Status" NOT NULL DEFAULT 'OPEN',
    "Priority" "public"."Priority" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);
