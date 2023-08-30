import { z } from "zod";

const obj = {
  s3Key: "API_S3_KEY",
  s3Secret: "API_S3_SECRET",
  appUrl: "API_APP_URL",
  redisUrl: "API_REDIS_URL",
  signKey: "API_AUTH_SIGN_KEY",
  s3Region: "API_S3_REGION",
  s3AccountId: "API_S3_ACCOUNT_ID",
  s3Bucket: "API_S3_BUCKET",
  databaseUrl: "API_DATABASE_URL",
  authGoogleId: "API_GOOGLE_OAUTH_ID",
  authGoogleSecret: "API_GOOGLE_OAUTH_SECRET",
  masterEncKey: "API_ENCRYPTION_MASTER_KEY"
};

const schemaKeys = {
  API_S3_KEY: z.string(),
  API_S3_SECRET: z.string(),
  API_APP_URL: z.string().url("API_APP_URL must be a valid URL"),
  API_REDIS_URL: z.string().url("API_APP_URL must be a valid URL"),
  API_AUTH_SIGN_KEY: z.string(),
  API_S3_REGION: z.string(),
  API_S3_ACCOUNT_ID: z.string(),
  API_S3_BUCKET: z.string(),
  API_DATABASE_URL: z.string(),
  API_GOOGLE_OAUTH_SECRET: z.string(),
  API_GOOGLE_OAUTH_ID: z.string(),
  API_ENCRYPTION_MASTER_KEY: z.string()
};

const schema = z.object(schemaKeys);

export const validateEnv = (data: unknown) => {
  schema.parse(data);
};

export const getEnvs = (data: unknown) => {
  return schema.parse(data);
};

export class EnvValidator {
  #unvalidatedValues;

  constructor(private environment: unknown) {
    this.#unvalidatedValues = environment;
  }

  public validate() {
    schema.parse(this.#unvalidatedValues);
  }

  public getEnv(variable: keyof typeof obj) {
    return schema.parse(this.#unvalidatedValues)[
      obj[variable] as keyof typeof schemaKeys
    ];
  }
}

export const env = new EnvValidator(process.env);
