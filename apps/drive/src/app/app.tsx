import { RouterProvider } from 'react-router-dom';
import { Provider } from './providers';
import { Router } from './routes';
import { StrictMode } from 'react';


export function App() {
  return (
    <StrictMode>
      <Provider>
        <RouterProvider router={Router} />
      </Provider>
    </StrictMode>
  )
}
