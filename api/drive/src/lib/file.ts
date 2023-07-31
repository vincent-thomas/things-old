import { Router } from 'express';
import { z } from 'zod';
import {
  authorize,
  getToken,
  rateLimit,
  toBuffer,
  validate,
} from '@api/shared';
import { getFile, uploadFile } from '@api/data';
import bodyParser from 'body-parser';
const file = Router();

const { input: getFileValidator, values: getFileValues } = validate(
  z.object({
    body: z.object({
      fileId: z.string(),
    }),
  })
);

file.get('/', rateLimit, authorize, getFileValidator, async (req, res) => {
  const { body } = getFileValues(req);
  const user = getToken(req);
  const file = await getFile({
    fileId: body.fileId,
    userId: user.sub,
  });

  res.json(file);
});

const { input: createFileValidator, values: getFileInput } = validate(
  z.object({
    query: z.object({
      fileKey: z.string(),
      fileType: z.string().min(2).max(4),
      folderId: z.string(),
    }),
    body: z.string(),
  })
);

file.post(
  '/',
  bodyParser.text(),
  rateLimit,
  authorize,
  createFileValidator,
  async (req, res) => {
    const { query, body } = getFileInput(req);
    const token = getToken(req);
    const result = await uploadFile({
      fileKey: query.fileKey,
      fileType: query.fileType,
      userId: token.sub,
      folderId: query.folderId,
      content: toBuffer(body, 'utf-8'),
    });

    res.send(result);
  }
);

export { file };
