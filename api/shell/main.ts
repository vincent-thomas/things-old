import driveRoute from '@api/drive';
import authRoute from '@api/auth';
import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import config from 'dotenv';
import { ap } from 'drizzle-orm/select.types.d-b947a018';
config.config();

declare const module: any;

async function bootstrap() {

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

  const port = process.env.PORT || 8080;

  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });

  server.on('error', console.error);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
  }

}

bootstrap()