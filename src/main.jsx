import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TnxProvider from '../context/Metamaskdata.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <TnxProvider>

    <App />
   </TnxProvider>

  </StrictMode>,
)
