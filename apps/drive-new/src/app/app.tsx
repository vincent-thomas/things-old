import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';

const ReactRouter = createBrowserRouter(routes);

export function App() {
  return <RouterProvider router={ReactRouter} />;
}
