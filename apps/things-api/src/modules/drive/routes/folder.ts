import { Router } from "express";
import { z } from "zod";
import { authorize, validate } from "@core/middleware";
import { getToken } from "src/core/hooks";
import { SendGenerator, resultSender, sender } from "../../../core/senders";
import { getFolder } from "@core/data";
import { STATUS_CODE, sendResult } from "@core/http";

const folder: Router = Router();

const { input: getFoldersBalidator, values: getFolderValues } = validate(
  z.object({
    query: z.object({
      folders: z.string().optional().default("false"),
      files: z.string().optional().default("false")
    }),
    params: z.object({
      folderId: z.string().optional()
    })
  })
);

folder.get("/:folderId?", authorize, getFoldersBalidator, async (req, res) => {
  const { query, params } = getFolderValues(req);
  const token = getToken(req);
  // TODO

  const result = await getFolder(token.sub, params.folderId);
  if (result === null) {
    return sendResult(
      res,
      { error: "Folder not found" },
      STATUS_CODE.NOT_FOUND
    );
  }
  sendResult(res, result, STATUS_CODE.OK);
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
