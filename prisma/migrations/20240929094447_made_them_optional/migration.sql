-- AlterTable
ALTER TABLE "users" ALTER COLUMN "oauth_id" DROP NOT NULL,
ALTER COLUMN "provider" DROP NOT NULL;
