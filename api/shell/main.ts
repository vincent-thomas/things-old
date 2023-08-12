import driveRoute from '@api/drive';
import authRoute from '@api/auth';
import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import 'dotenv/config';
import { logger } from '@things/logger';
import { EnvValidator } from '@api/env';
declare const module: any;

async function bootstrap() {
  const app = express();

  app.use(
    helmet(),
    cors(),
    cookieParser(),
    (_req, res, next) => {
      res.setHeader('X-Powered-By', 'Things');
      next();
    },
    express.json()
  );
  app.get('/healthcheck', (req, res) => {
    res.status(200).send({ status: 'up', code: 200 });
  });
  app.use('/drive', driveRoute);
  app.use('/oauth', authRoute);

  const port = process.env.PORT || 8080;

  const server = app.listen(port, () => {
    logger.info(`Api started at: http://localhost:${port}`);
  });

  server.on('error', console.error);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
  }
}

new EnvValidator(process.env).validate();

bootstrap();
