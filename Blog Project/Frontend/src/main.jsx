import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/UserContext.jsx'
import axios from 'axios'

// Set axios default baseURL
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:4000'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
      <BrowserRouter>
      <App />
    </BrowserRouter>
    </UserContext>
  </StrictMode>
)
