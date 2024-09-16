-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "siteName" TEXT NOT NULL,
    "copyright" TEXT NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);
