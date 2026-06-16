import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeAutosave } from './hooks/useAutosave';
import './globals.css';

initializeAutosave();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
