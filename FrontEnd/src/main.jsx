import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NotesContextProvider } from './Context/NotesContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotesContextProvider>
      <App />
    </NotesContextProvider>
  </StrictMode>,
)