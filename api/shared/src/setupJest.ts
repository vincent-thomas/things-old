import {configDotenv} from "dotenv";
import { resolve } from "path";

configDotenv({path: resolve('.env.local')});
configDotenv({path: resolve('api/shell/.env')});
process.env['API_AUTH_SIGN_KEY'] = 'TEST';