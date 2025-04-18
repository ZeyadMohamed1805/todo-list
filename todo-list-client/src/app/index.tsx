import './index.scss'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <></>
    </StrictMode>
  )
}