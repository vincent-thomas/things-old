import { Router } from 'express';
import { z } from 'zod';
import {
  authorize,
  getToken,
  validate,
  rateLimit,
  ERROR_TYPE,SendGenerator,
  errorSender, sender, resultSender
} from '@api/shared';
import { createFolder, getFolders } from '@api/data';

const folder = Router();

const { input: getFoldersBalidator, values: getFolderValues } = validate(
  z.object({
    body: z.object({
      folderId: z.string().optional(),
    }),
    query: z.object({
      folders: z.string().optional().default('false'),
      files: z.string().optional().default('false'),
    }),
  })
);

folder.get('/', rateLimit, authorize, getFoldersBalidator, async (req, res) => {
  const { body, query } = getFolderValues(req);
  const token = getToken(req);
  const result = await getFolders(
    token.sub,
    body.folderId === undefined ? null : body.folderId,
    query.files === '',
    query.folders === ''
  );
  res.json(result);
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

folder.post(
  '/',
  authorize,
  rateLimit,
  createFolderValidator,
  async (req, res) => {
    const { body } = getFolderInputValues(req);
    const user = getToken(req);
    let error: SendGenerator | false = false;

    const result = await createFolder({
      folderKey: body.folderKey,
      ownerId: user.sub,
      parentFolderId: body.parentFolderId,
    }).catch((v) => {
      if (v.cause === "NOT_AUTHORIZED") {
        error = errorSender({status: 401,  errors: [{cause: ERROR_TYPE.UNAUTHORIZED_ERROR ,message: "You are not authorized"}]})
      } else {
        error = errorSender({status: 500, errors: [{cause: ERROR_TYPE.INTERNAL_SERVER_ERROR, message: "Something went wrong"}]})
      }
    }).then(v => resultSender({data: v, status: 200}))
    sender(res, error ? error : result)
  }
);

export { folder };