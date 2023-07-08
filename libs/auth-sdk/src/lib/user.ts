import type { RedisClientType } from 'redis';
export async function getSession(redis: RedisClientType, sessionId: string) {
  const session = (await redis.json.get(`session:${sessionId}`)) as unknown as {
    userId: string;
  };
  console.log(session);
  if (session === null) return null;

  const user = await redis.json.get(`account:${session?.userId as string}`);

  return user;
}
