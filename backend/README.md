# backend

To install dependencies:

```bash
bun install
```

Create your environment file:

```bash
cp .env.example .env
```

For Neon, set both URLs:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST.neon.tech/DBNAME?sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@HOST.neon.tech/DBNAME?sslmode=require"
PORT=3000
```

Use `DATABASE_URL` for the app runtime. Use `DIRECT_URL` for Prisma migrations. If you only have one Neon URL for now, paste the same URL into both values.

Validate and generate Prisma:

```bash
bun run prisma:validate
bun run prisma:generate
```

Create/apply a local development migration:

```bash
bun run prisma:migrate -- --name init
```

Apply committed migrations in production:

```bash
bun run prisma:deploy
```

Run the API:

```bash
bun run dev
```

Health check:

```bash
curl http://localhost:3000/health
```

## Prisma + Bun + Express rules

Keep the database URL out of `schema.prisma` on Prisma 7+. URLs live in `prisma.config.ts` for Prisma CLI commands and in `src/db.ts` for the running app.

Import Prisma from one singleton only:

```ts
import prisma from "./src/db";
```

Do not create new `PrismaClient()` instances inside routes. Reuse the singleton so connections and generated types stay consistent.

After changing `prisma/schema.prisma`, run:

```bash
bun run prisma:validate
bun run prisma:generate
```

When the schema change should alter the database, run:

```bash
bun run prisma:migrate -- --name your_change_name
```

This project was created using `bun init` in bun v1.3.10. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
