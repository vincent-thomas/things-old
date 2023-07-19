import { Router } from 'express';
import { z } from 'zod';
import { authorize, validate } from '@api/shared';
const folder = Router();

const bodySchema = z.object({
  body: z.object({
    folder_key: z
      .string()
      .min(1, 'Folder-name cannot be less than 1 character')
      .max(10, 'Folder-name cannot be more than 10 character'),
  }),
  query: z.object({
    test: z.string(),
  }),
});

folder.post('/', authorize, validate(bodySchema).input, (req, res) => {
  const test = validate(bodySchema).values(req);
  console.log(test);
  res.json(test);
});

export { folder };
