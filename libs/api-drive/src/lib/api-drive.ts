import { Router } from 'express';

const ApiDriveRouter = Router();

ApiDriveRouter.get('/resource', (req, res) => {
  res.send('testing');
});

export { ApiDriveRouter };
