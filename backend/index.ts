import express from 'express';

import { ChatRouter } from './src/chats/chat';
import prisma from './src/db';

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());

app.get("/health", async (_req, res) => {
  await prisma.$queryRaw`SELECT 1`;
  res.json({ ok: true });
});

app.use("/api/v1/chat", ChatRouter);

app.listen(port, () => {
  console.log(`server running on ${port}`);
});


/*
STACK
- bun, ts, express, openrouter, qdrant or any other vectorDB, redis, 
- react, tailwind, (stick to this for now)
*/
