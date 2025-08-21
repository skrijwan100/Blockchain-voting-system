import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MetamaskdataProvider from '../context/Metamaskdata.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <MetamaskdataProvider> */}
    <App />
    {/* </MetamaskdataProvider> */}
  </StrictMode>,
)
