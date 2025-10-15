-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Buyer', 'Seller', 'QC Agent', 'Admin');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Active', 'Locked', 'Pending', 'Suspended');

-- CreateEnum
CREATE TYPE "OpsStatus" AS ENUM ('Pending QC', 'Hold', 'Verification', 'Review');

-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('Operational', 'Warning', 'Down');

-- CreateEnum
CREATE TYPE "TrendDirection" AS ENUM ('up', 'down');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "user_code" VARCHAR(20) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(50),
    "role" "Role" NOT NULL,
    "status" "Status" NOT NULL,
    "last_login" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operations_queue" (
    "id" SERIAL NOT NULL,
    "order_code" VARCHAR(50) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "action_type" VARCHAR(100) NOT NULL,
    "related_entity" VARCHAR(255) NOT NULL,
    "status" "OpsStatus" NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "operations_queue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_status" (
    "id" SERIAL NOT NULL,
    "service_name" VARCHAR(100) NOT NULL,
    "status" "ServiceStatus" NOT NULL,
    "details" TEXT,
    "latency_ms" INTEGER,
    "cpu_usage" INTEGER,
    "last_checked" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "system_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statistics" (
    "id" SERIAL NOT NULL,
    "stat_type" VARCHAR(100) NOT NULL,
    "current_value" VARCHAR(50) NOT NULL,
    "trend_direction" "TrendDirection",
    "trend_value" VARCHAR(50),
    "period" VARCHAR(50),
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "statistics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_code_key" ON "users"("user_code");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "operations_queue_order_code_key" ON "operations_queue"("order_code");
