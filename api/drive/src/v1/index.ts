import { Router } from 'express';
import { folder } from './folder';
import { file } from './file';

const driveRouter = Router();

driveRouter.use('/folder', folder);
driveRouter.use('/file', file);

export default driveRouter;
