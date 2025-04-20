import './index.scss';
import '../locales';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Router from '../router';
import Providers from '../providers';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Providers>
        <Router />
      </Providers>
    </StrictMode>
  );
}
