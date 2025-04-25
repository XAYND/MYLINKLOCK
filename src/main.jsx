import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import './pages/index.css'; // si tu utilises Tailwind ou CSS général ici

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
