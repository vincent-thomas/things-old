import { Request, Router } from "express";
import { z } from "zod";
import { authorize, validate } from "src/core/middleware/public_api";
import { getToken } from "src/core/hooks";
import { STATUS_CODE, sendResult } from "@core/http";
import { createDBObject, getDBObject, updateDBObject } from "@core/data";
import { env } from "src/env";
import { presigned } from "../lib/presign";
import { createObject } from "../lib/object";
import { resultSender } from "src/core/senders";
const file = Router();

const { input: getFileValidator, values: getFileValues } = validate(
  z.object({
    params: z.object({
      fileId: z.string()
    })
  })
);

file.get("/:fileId", authorize, getFileValidator, async (req, res) => {
  // TODO

  const user = getToken(req);
  const { params } = getFileValues(req);

  const { success, data } = await getDBObject(user.sub, params.fileId);
  if (!success) {
    return res.status(404).json({ error: "DOESNT EXIST", data: null });
  }
  sendResult(res, data, STATUS_CODE.OK);
});

const presignedSchema = z.object({
  fileKey: z.string(),
  fileType: z.string().min(2).max(4),
  folderId: z.string()
});

const { input: createFileValidator, values: getFileInput } = validate(
  z.object({
    body: presignedSchema
  })
);

const { createPayload: createSign, validate: validateSign } =
  presigned(presignedSchema);

file.post("/", authorize, createFileValidator, async (req, res) => {
  const { body } = getFileInput(req);
  const payload = createSign(body, 300);
  sendResult(
    res,
    {
      url: `${env.getEnv("appUrl")}/drive/object/objectUpload/${payload}`,
      expires: "5m"
    },
    STATUS_CODE.CREATED
  );
});

const { input: validatorThis, values: theValues } = validate(
  z.object({
    params: z.object({
      data: z.string()
    })
  })
);

const readBodyAsBuffer = (req: Request): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const body: Buffer[] = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      resolve(Buffer.concat(body));
    });
    req.on("error", (err) => {
      reject(err);
    });
  });
};

file.post("/objectUpload/:data", validatorThis, async (req, res) => {
  const {
    params: { data: values }
  } = theValues(req);
  const { data: fileMeta, success } = validateSign(values);
  if (!success || !fileMeta) {
    return res.json({ error: "Link not valid" });
  }
  const user = getToken(req, true);

  const theBody = await readBodyAsBuffer(req);

  const result = await createObject(
    fileMeta.folderId,
    user.sub,
    {
      filename: fileMeta.fileKey,
      fileType: fileMeta.fileType
    },
    theBody
  );
  if (result) {
    sendResult(res, undefined, STATUS_CODE.CREATED);
  } else {
    res.status(500).json({ error: "Something went wrong" });
  }
});

const { input: updateFileInput, values: updateFileValues } = validate(
  z.object({
    params: z.object({
      fileId: z.string()
    }),
    body: z.object({
      fileKey: z.string().optional()
    })
  })
);

file.patch("/:fileId", authorize, updateFileInput, async (req, res) => {
  const { params, body } = updateFileValues(req);

  const { success, error } = await updateDBObject(params.fileId, {
    fileKey: body.fileKey
  });

  if (!success) {
    return res.status(404).json({ error });
  }

  sendResult(res, { success: true, message: ":(" });
});

export { file };
