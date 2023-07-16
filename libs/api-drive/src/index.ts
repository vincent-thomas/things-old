import { Router } from 'express';
import { folder } from './lib/folder';

const ApiDriveRouter = Router();

ApiDriveRouter.use(folder);

export { ApiDriveRouter };
