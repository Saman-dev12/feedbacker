/*
  Warnings:

  - Added the required column `oauth_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "oauth_id" TEXT NOT NULL,
ADD COLUMN     "provider" TEXT NOT NULL;
