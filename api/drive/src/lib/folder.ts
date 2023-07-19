import { Router } from 'express';
import { z } from 'zod';
import { authorize, getToken, validate } from '@api/shared';
import { getFolders } from '@api/data';
const folder = Router();

const { input: getFoldersBalidator, values: getFolderValues } = validate(
  z.object({
    body: z.object({
      folder_key: z
        .string()
        .min(1, 'Folder-name cannot be less than 1 character')
        .max(10, 'Folder-name cannot be more than 10 character')
        .default('root'),
    }),
  })
);

folder.get('/', authorize, getFoldersBalidator, async (req, res) => {
  const { body } = getFolderValues(req);
  if (body.folder_key === 'root') {
    const token = getToken(req);
    console.log(await getFolders(token.sub));
  }
  res.json(body);
});

const { input: createFolderValidator, values: getFolderInputValues } = validate(
  z.object({
    body: z.object({
      folderKey: z
        .string()
        .min(1, 'Folder-name cannot be less than 1 character')
        .max(10, 'Folder-name cannot be more than 10 character'),
      parentFolderId: z.string().optional(),
    }),
  })
);

folder.post('/', authorize, createFolderValidator, async (req, res) => {
  const { body } = getFolderInputValues(req);
  let isRoot = false;
  if (body.parentFolderId === undefined) {
    isRoot = true;
  }

  // createFolder;
  res.json(body);
});

export { folder };
