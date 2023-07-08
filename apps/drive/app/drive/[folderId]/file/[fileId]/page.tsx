import { getFile } from '@drive/services/api/file';
import { getUser } from '@drive/services/api/user';
import type { ServerPage } from '@drive/types/page';

const Page = async (props: ServerPage) => {
  const { fileId } = props.params;
  const user = await getUser(true);

  const file = await getFile(
    fileId as string,
    user?.id as string,
    user?.encryptionKey as Buffer
  );
  console.log(file);
  return <>{file?.body}</>;
};

export default Page;
