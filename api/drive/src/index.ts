import { Router } from 'express';
import { folder } from './lib/folder';

const ApiDriveRouter = Router();

ApiDriveRouter.use('/folder', folder);
ApiDriveRouter.get('/ping', (req, res) => {
  res.send('Drive api is up');
});
export { ApiDriveRouter };
