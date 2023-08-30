// import { redis } from '@api/data';
// import type { NextFunction, Request, Response } from 'express';
// import rl from 'express-rate-limit';
// import RedisStore from 'rate-limit-redis';

// const store = new RedisStore({
//   sendCommand: (...args: string[]) => redis.sendCommand(args),
//   prefix: 'ratelimit:',
// });

// const limiter = rl({
//   windowMs: 60 * 1000,
//   max: 100,
//   standardHeaders: true,
//   legacyHeaders: true,
//   store,
// });
// export const rateLimit = (req: Request, res: Response, next: NextFunction) => {
//   return limiter(req, res, next);
// };
