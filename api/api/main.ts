import driveRoute from '@api/drive';
import authRoute from '@api/auth';
import express from 'express';
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
  express.json(),
  cookieParser()
);
app.use('/drive', driveRoute);
app.use('/oauth', authRoute);

const port = process.env.PORT || 3333;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

server.on('error', console.error);
