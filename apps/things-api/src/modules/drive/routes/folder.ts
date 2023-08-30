import { Router } from "express";
import { z } from "zod";
import { authorize, validate } from "../../../core/middleware/public_api";
import { getToken } from "src/core/hooks";
import { SendGenerator, resultSender, sender } from "../../../core/senders";
// import {
//   getToken,
//   ERROR_TYPE,
// } from '@api/shared';
// import {SendGenerator,
//   errorSender, sender, resultSender, STATUS_CODE} from "@things/express-func"
// import { createFolder, getFolders } from '@api/data';
// import { logger } from '@things/logger';

const folder = Router();

const { input: getFoldersBalidator, values: getFolderValues } = validate(
  z.object({
    query: z.object({
      folderId: z.string().optional(),
      folders: z.string().optional().default("false"),
      files: z.string().optional().default("false")
    })
  })
);

folder.get("/", authorize, getFoldersBalidator, async (req, res) => {
  const { query } = getFolderValues(req);
  const token = getToken(req);
  // TODO
  // const result = await getFolders(
  //   token.sub,
  //   query.folderId === undefined ? null : query.folderId,
  //   query.files === '',
  //   query.folders === ''
  // );
  sender(res, resultSender({ data: token, status: 200 }));
});

const { input: createFolderValidator, values: getFolderInputValues } = validate(
  z.object({
    body: z.object({
      folderKey: z
        .string()
        .min(1, "Folder-name cannot be less than 1 character")
        .max(10, "Folder-name cannot be more than 10 character"),
      parentFolderId: z.string().optional()
    })
  })
);

folder.post("/", authorize, createFolderValidator, async (req, res) => {
  const { body } = getFolderInputValues(req);
  const user = getToken(req);
  const error: SendGenerator | false = false;
  res.send(user);
  //   const result = await createFolder({
  //     folderKey: body.folderKey,
  //     ownerId: user.sub,
  //     parentFolderId: body.parentFolderId,
  //   }).catch((v) => {
  //     if (v.cause === ERROR_TYPE.CONFLICT) {
  //       error = errorSender({status: STATUS_CODE.CONFLICT,  errors: [{cause: ERROR_TYPE.CONFLICT ,message: "Folder already exists"}]})
  //       console.error("Folder already exists", v);
  //     } else {
  //       error = errorSender({status: 500, errors: [{cause: ERROR_TYPE.INTERNAL_SERVER_ERROR, message: "Something went wrong"}]})
  //     }
  //   }).then(v => resultSender({data: v, status: 200}))
  //   sender(res, error ? error : result)
});

export { folder };
