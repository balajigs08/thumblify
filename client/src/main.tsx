import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <Toaster />
      <App />
    </AuthProvider>
  </BrowserRouter>
)