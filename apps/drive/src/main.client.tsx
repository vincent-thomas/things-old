import {createRoot} from 'react-dom/client';
import '@things/ui/styles';
import { App } from './app/app';

const root = createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);
