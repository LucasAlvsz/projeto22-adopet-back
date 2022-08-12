-- CreateTable
CREATE TABLE "interested_pet" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "petId" INTEGER NOT NULL,

    CONSTRAINT "interested_pet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "interested_pet" ADD CONSTRAINT "interested_pet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interested_pet" ADD CONSTRAINT "interested_pet_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
