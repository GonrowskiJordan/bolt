import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';
import App from './App.tsx';
import { FamilyMembersProvider } from './context/FamilyMembersContext';
import { BrokerProvider } from './context/BrokerContext';
import './index.css';

const swrConfig = {
  revalidateOnFocus: false,
  shouldRetryOnError: false
};

// Make sure we're finding the root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Failed to find the root element');
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <SWRConfig value={swrConfig}>
          <FamilyMembersProvider>
            <BrokerProvider>
              <App />
            </BrokerProvider>
          </FamilyMembersProvider>
        </SWRConfig>
      </BrowserRouter>
    </StrictMode>
  );
}