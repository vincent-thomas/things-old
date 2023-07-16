import { Router } from 'express';
import { z } from 'zod';
import { authorize } from '@api/shared/middleware';
const bodySchema = z.object({
  folder_key: z
    .string()
    .min(1, 'Folder-name cannot be less than 1 character')
    .max(10, 'Folder-name cannot be more than 10 character'),
});

const folder = Router();
folder.post('/', authorize, (req, res) => {
  const body = bodySchema.parse(req.body);
  res.send(body);
});

export { folder };
