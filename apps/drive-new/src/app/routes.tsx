import { RouteObject } from 'react-router-dom';
import Landing from './page/landing/landing';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Landing />,
  },
];
