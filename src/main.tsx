import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/styles/index.css'
import App from './app/ui/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
