import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { FacebookProvider } from 'react-facebook';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="108159087761-lr30ra9m9s23uc2vgvoi82fp37havero.apps.googleusercontent.com">
     <FacebookProvider appId="767107335232863">

  <React.StrictMode>
    <App />
  </React.StrictMode>,
     </FacebookProvider>
  </GoogleOAuthProvider>
)
