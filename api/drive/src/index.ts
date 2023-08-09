import { Router } from 'express';
import { folder } from './v1/folder';
import { file } from './v1/file';
import { logger } from '@things/logger';

const driveRouter = Router();

driveRouter.use('/v1/folder', folder);
driveRouter.use('/v1/file', file);
driveRouter.get('/ping', (req, res) => {
  res.send('Drive api is up');
});
logger.info(`Drive  api loading...`)

export default driveRouter;
