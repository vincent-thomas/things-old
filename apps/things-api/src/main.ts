import "dotenv/config";
import { EnvValidator } from "./env";
import app from "./app";

async function bootstrap() {
  const port = process.env.PORT || 8080;

  const server = app.listen(port, () => {
    console.info(`Api started at: http://localhost:${port}`);
  });

  server.on("error", console.error);
}

new EnvValidator(process.env).validate();

bootstrap();
