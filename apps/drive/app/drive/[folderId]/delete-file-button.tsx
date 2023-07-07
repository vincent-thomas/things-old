"use client";

import axios from "axios";

interface DeleteFileI {
  fileId: string;
}

export const DeleteFileButton = (props: DeleteFileI) => {
  return (
    <button onClick={() => axios.post("/api/removeFile", props)}>delete</button>
  );
};
