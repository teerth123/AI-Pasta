-- CreateTable
CREATE TABLE "Chats" (
    "id" SERIAL NOT NULL,
    "chatName" TEXT NOT NULL,
    "summary" TEXT NOT NULL DEFAULT 'This is a new chat. The summary will be added once messages are added.',
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "prompt" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "relatedQueries" TEXT NOT NULL,
    "modelUsed" TEXT NOT NULL,
    "chatId" INTEGER NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
