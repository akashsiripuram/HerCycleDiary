import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ThemeProvider } from './Contexts/ThemeContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
  <ThemeProvider>
    <App />
    <Toaster position="top-right" richColors />
    </ThemeProvider>
  </StrictMode>
  </BrowserRouter>,

)
