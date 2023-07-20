import { Router } from 'express';
import { folder } from './lib/folder';
import { file } from './lib/file';

const driveRouter = Router();

driveRouter.use('/folder', folder);
driveRouter.use('/file', file);
driveRouter.get('/ping', (req, res) => {
  res.send('Drive api is up');
});
export default driveRouter;
