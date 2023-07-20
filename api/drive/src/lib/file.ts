import { Router } from 'express';
import { z } from 'zod';
import { authorize, getToken, validate } from '@api/shared';
import { getFile, uploadFile } from '@api/data';
const file = Router();

const { input: getFileValidator, values: getFileValues } = validate(
  z.object({
    body: z.object({
      fileId: z.string(),
    }),
  })
);

file.get('/', authorize, getFileValidator, async (req, res) => {
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
  })
);

file.post('/', authorize, createFileValidator, async (req, res) => {
  const { query } = getFileInput(req);
  const token = getToken(req);
  const result = await uploadFile({
    fileKey: query.fileKey,
    fileType: query.fileType,
    userId: token.sub,
    folderId: query.folderId,
    content: Buffer.from('testing'),
  });
  res.send(result);
});

export { file };
