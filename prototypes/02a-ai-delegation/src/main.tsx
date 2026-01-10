import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { AuthProvider } from '@/auth/AuthContext'
import { DatabaseProvider } from './contexts/DatabaseContext'
import { router } from './router'

// App entry point with provider hierarchy:
// DatabaseProvider (top) → AuthProvider → RouterProvider
// Database must initialize first, then auth can use it

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DatabaseProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </DatabaseProvider>
  </StrictMode>,
)
