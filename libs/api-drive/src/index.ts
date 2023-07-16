import { Router } from 'express';
import { folder } from './lib/folder';

const ApiDriveRouter = Router();

ApiDriveRouter.use('/folder', folder);
ApiDriveRouter.get('/test', (req, res) => {
  res.send('testing');
});
export { ApiDriveRouter };
