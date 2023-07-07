"use client";
import { utils } from "@drive/services/utils";
import { useForm, type SubmitHandler } from "react-hook-form";

interface FormInput {
  folderName: string;
}

export function CreateFolderButton({
  parentFolderId,
}: {
  parentFolderId: string;
}) {
  const { register, handleSubmit } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = async ({ folderName }) => {
    await fetch(`${utils.getAppUrl()}/api/uploadFolder`, {
      method: "PUT",
      body: JSON.stringify({
        key: folderName,
        parentFolderId: parentFolderId === "root" ? undefined : parentFolderId,
        root: parentFolderId === "root",
      }),
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("folderName")} />
      <button type="submit">Create Folder</button>
    </form>
  );
}
