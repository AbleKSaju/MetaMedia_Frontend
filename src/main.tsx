import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="108159087761-lr30ra9m9s23uc2vgvoi82fp37havero.apps.googleusercontent.com">
   

  <React.StrictMode>
    <App />
  </React.StrictMode>,
    
  </GoogleOAuthProvider>
)
