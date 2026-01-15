import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { AuthProvider } from '@/auth/AuthContext'
import { DatabaseProvider } from './contexts/DatabaseContext'
import { HouseholdProvider } from './contexts/HouseholdContext'
import { router } from './router'

// App entry point with provider hierarchy:
// DatabaseProvider (top) → AuthProvider → HouseholdProvider → RouterProvider
// Database must initialize first, then auth, then household context

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DatabaseProvider>
      <AuthProvider>
        <HouseholdProvider>
          <RouterProvider router={router} />
        </HouseholdProvider>
      </AuthProvider>
    </DatabaseProvider>
  </StrictMode>,
)
