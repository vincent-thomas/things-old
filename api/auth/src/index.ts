import { Router } from 'express';
import { authorizeV1 } from './routes/v1/authorize';
import { currentUserV1 } from './routes/v1/current-user';

export default Router()
  .use('/v1/authorize', authorizeV1)
  .use('/v1/current-user', currentUserV1)
  .get('/ping', (req, res) => {
    res.send('OAuth 2.0 server is up!');
  });
