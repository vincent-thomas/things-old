import { useUser } from "../../providers/user";
import { Button, Title } from "@things/ui";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Routes } from "../../routes";
import { browserFolderLoaderSettings } from "../../loaders/drive";

const MainPage = () => {
  const value = useUser();
  const params = useParams();
  const { status, data } = useQuery(
    browserFolderLoaderSettings(params.folderId as string)
  );
  if (value.loading) return <>loading..</>;
  if (!value.authed) return <>not authed</>;
  return (
    <>
      <Button variant="ghost">
        Hello {value.user.fullName}
        <br />
        {JSON.stringify(value.user)}
        <br />
      </Button>
      <br />
      <pre></pre>
      <Title>Files</Title>
      <ul>
        {data?.files.map((v) => (
          <li key={v.id}>
            <Link to={Routes.getFile(v.id)}>{v.filename}</Link>
          </li>
        ))}
      </ul>
      <Title>Folders</Title>
      <ul>
        {data?.folders.map((v) => (
          <li key={v.id}>
            <Link to={Routes.browse(v.id)}>{v.folderName}</Link>
          </li>
        ))}
      </ul>
      <Link to={Routes.browse()}>back</Link>
    </>
  );
};

export default MainPage;
