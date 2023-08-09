import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { AuthCodeCallback } from './page/landing/callback/auth-code';
import { lazy } from 'react';


const Protected = lazy(() => import('./page/protected'));
const Home = lazy(() => import('./page/landing/landing'));


export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/callback/auth-code',
    element: <AuthCodeCallback />
  },
  {
    path: '/protected',
    element: <Protected />
  }
]

export const Router = createBrowserRouter(routes);