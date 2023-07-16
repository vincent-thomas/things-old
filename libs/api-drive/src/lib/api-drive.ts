import { Router } from 'express';

const ApiDriveRouter = Router();

ApiDriveRouter.get('/testing', (req, res) => {
  res.send('testing');
});

export { ApiDriveRouter };
