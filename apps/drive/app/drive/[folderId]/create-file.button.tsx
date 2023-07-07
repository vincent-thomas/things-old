"use client";

export const CreateFileButton = (props: { parentFolderId: string }) => {
  const genFile = async () => {
    await fetch(
      `/api/uploadFile?key=test.txt&parent_folder=${props.parentFolderId}&file_type=txt`,
      { method: "post", body: "fdsjfkdhsafhdsa" }
    );
    // const data = await result.json();
  };

  return <button onClick={genFile}>Generate File</button>;
};
