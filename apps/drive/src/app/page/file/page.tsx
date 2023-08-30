import { Title } from "@things/ui";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Router, Routes } from "../../routes";

const Page = () => {
  const { fileId } = useParams();
  const [file, setFile] = useState<any>("loading...");

  useEffect(() => {
    const result = fetch(
      "http://localhost:8080/drive/v1/file?fileId=" + fileId,
      {
        headers: {
          authorization: "Bearer " + sessionStorage.getItem("access-token")
        }
      }
    )
      .then((v) => v.json())
      .then((v) => setFile(v.data));
  }, []);

  return (
    <>
      <Title>
        {file.filename} - {file.fileType}
      </Title>
      {file.body}
      <br />
      <Link to={Routes.browse(file.parentFolderId)}>go back</Link>
    </>
  );
};

export default Page;
