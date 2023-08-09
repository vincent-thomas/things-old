pnpm deps-up
pnpm drizzle-kit push:mysql --config=api/data/drizzle.config.ts
nx serve api-shell & nx run api-data:drizzle:studio