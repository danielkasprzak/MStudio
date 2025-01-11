import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import store from './store/index.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId='819836214619-2cv5amboabtemjbpa3kas858tjp7gcrj.apps.googleusercontent.com'>
    <StrictMode>
        <Provider store={store}><App /></Provider>
      
    </StrictMode>
  </GoogleOAuthProvider>
);
