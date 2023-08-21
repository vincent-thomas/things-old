import { Router } from 'express';
import { authorizeV1 } from './routes/v1/authorize';
import { currentUserV1 } from './routes/v1/current-user';
import { loginV1 } from './routes/v1/login';
import { logger } from '@things/logger';
import createUserV1 from './routes/v1/create-user';
import { tokenV1 } from './routes/v1/token';

export default Router()
  .use('/v1/authorize', authorizeV1)
  .use('/v1/current-user', currentUserV1)
  .use('/v1/login', loginV1)
  .use('/v1/create-user', createUserV1)
  .use('/v1/token', tokenV1);

logger.debug(`Oauth2 api loading...`);
