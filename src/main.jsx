import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ContextApp } from './Store/context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextApp><App /></ContextApp>
  </StrictMode>,
)
