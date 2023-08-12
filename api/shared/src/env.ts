import { EnvValidator } from "@api/env";


export const env = new EnvValidator(process.env);
