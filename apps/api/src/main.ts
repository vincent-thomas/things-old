/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ApiDriveRouter } from '@api/drive';
import express from 'express';
import * as path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/drive', ApiDriveRouter);

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
