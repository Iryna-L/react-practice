import { createRoot } from 'react-dom/client';
import { App } from './App';
import './assets/styles/index.scss';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);