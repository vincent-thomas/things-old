/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import driveRoute from '@api/drive';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import config from 'dotenv';
config.config();

const app = express();
app.use(
  helmet(),
  (_req, res, next) => {
    res.setHeader('X-Powered-By', 'Things');
    next();
  },
  bodyParser.json(),
  cookieParser()
);
app.use('/drive', driveRoute);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
