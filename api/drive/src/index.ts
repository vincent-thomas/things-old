import { Router } from 'express';
import driveV1Router from './v1';

import { logger } from '@things/logger';

const driveRouter = Router();

driveRouter.use('/v1', driveV1Router);
logger.debug(`Drive  api loading...`);

export default driveRouter;
