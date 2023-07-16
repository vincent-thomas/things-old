import { Router } from 'express';
import { z } from 'zod';

const bodySchema = z.object({
  folder_key: z
    .string()
    .min(1, 'Folder-name cannot be less than 1 character')
    .max(10, 'Folder-name cannot be more than 10 character'),
});

const getAuthorizationValues = (authHeaderValue: string) => {
  const [type, token] = authHeaderValue.split(' ');
  return [type, token];
};

const folder = Router();
folder.post('/', (req, res) => {
  console.log(req.headers);
  const body = bodySchema.parse(req.body);
  res.send(body);
});

export { folder };
