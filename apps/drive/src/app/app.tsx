import { RouterProvider } from 'react-router-dom';
import { Provider } from './providers';
import { Router } from './routes';


export function App() {
  return (
    <Provider>
      <RouterProvider router={Router} />
    </Provider>
  )
}
