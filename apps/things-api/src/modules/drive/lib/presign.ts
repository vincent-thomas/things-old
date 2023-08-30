import { formatTo, toBuffer } from "@things/format";
import { decrypt, encrypt } from "@things/crypto";
import { env } from "src/env";
import { ZodSchema } from "zod";

const seperator = "$";

export const presigned = <T>(schema: ZodSchema<T>) => ({
  createPayload: (data: T, validSeconds: number) => {
    const dataToSign = JSON.stringify(schema.parse(data));
    const dataBase64 = formatTo(dataToSign, "utf-8", "base64");
    const signed = encrypt(
      `${dataToSign}${seperator}${dataBase64}${seperator}${
        new Date().getTime() + validSeconds * 1000
      }`,
      toBuffer(env.getEnv("masterEncKey"), "base64")
    );
    return signed;
  },
  validate: (data: string) => {
    const deCryptData = decrypt(
      data,
      toBuffer(env.getEnv("masterEncKey"), "base64")
    );

    const [rawData, base64Data, validUntil] = deCryptData.split(seperator);
    const hasntBenChanged = rawData === formatTo(base64Data, "base64", "utf-8");
    const isValid = parseInt(validUntil) > new Date().getTime();

    if (!hasntBenChanged || !isValid) {
      return { success: false };
    }

    return { data: schema.parse(JSON.parse(rawData)) as T, success: true };
  }
});
