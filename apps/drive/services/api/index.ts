// export * from "./file";
// export * from "./folder";
// export * from "./user";

import * as filesApi from "./file";
import * as usersApi from "./user";
import * as foldersApi from "./folder";
import * as caches from "./cache";
export const api = {
  ...filesApi,
  ...usersApi,
  ...foldersApi,
  ...caches,
};
