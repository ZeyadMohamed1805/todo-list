import './index.scss'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import Router from '../router';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Router />
    </StrictMode>
  )
}