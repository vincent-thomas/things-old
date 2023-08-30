import { RouteObject, createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Drive from "./page/drive";
import FilePage from "./page/file";
import { queryClient } from "./providers";
import { browseFoldersLoader } from "./loaders/drive";

const Home = lazy(() => import("./page/landing/landing"));
const AuthCodeCallback = lazy(
  () => import("./page/landing/callback/auth-code")
);

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/callback/auth-code",
    element: <AuthCodeCallback />
  },
  {
    path: "/drive/b/:folderId?",
    element: <Drive />,
    loader: browseFoldersLoader(queryClient)
  },
  {
    path: "/drive/b/f/:fileId",
    element: <FilePage />
  }
];

export const Routes = {
  home: "/",
  callback: {
    authCode: "/callback/auth-code"
  },
  browse: (folderId = "") => `/drive/b${folderId ? `/${folderId}` : ""}`,
  getFile: (fileId = "") => `/drive/b/f/${fileId}`
};

export const Router = createBrowserRouter(routes);
