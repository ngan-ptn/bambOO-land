/**
 * Router - App routing with protected routes
 */

import { createBrowserRouter, Navigate } from 'react-router-dom'
import { useAuthContext } from '@/auth/AuthContext'
import App from './App'
import { LoginScreen } from '@/components/Auth/LoginScreen'
import { RegistrationScreen } from '@/components/Auth/RegistrationScreen'
import { ForgotPasswordScreen } from '@/components/Auth/ForgotPasswordScreen'
import { ResetPasswordScreen } from '@/components/Auth/ResetPasswordScreen'
import { WelcomeScreen } from '@/components/Onboarding/WelcomeScreen'
import { NameScreen } from '@/components/Onboarding/NameScreen'
import { GoalScreen } from '@/components/Onboarding/GoalScreen'
import { CaloriesScreen } from '@/components/Onboarding/CaloriesScreen'
import { ProfileScreen } from '@/components/Profile/ProfileScreen'
import { EditProfileScreen } from '@/components/Profile/EditProfileScreen'
import { EditGoalsScreen } from '@/components/Profile/EditGoalsScreen'
import { ChangePasswordScreen } from '@/components/Profile/ChangePasswordScreen'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthContext()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, profile } = useAuthContext()

  // If authenticated but no profile, allow access (user needs to complete onboarding)
  if (isAuthenticated && profile) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <AuthRoute><LoginScreen /></AuthRoute>,
  },
  {
    path: '/register',
    element: <AuthRoute><RegistrationScreen /></AuthRoute>,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordScreen />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordScreen />,
  },
  {
    path: '/onboarding/welcome',
    element: <ProtectedRoute><WelcomeScreen /></ProtectedRoute>,
  },
  {
    path: '/onboarding/name',
    element: <ProtectedRoute><NameScreen /></ProtectedRoute>,
  },
  {
    path: '/onboarding/goal',
    element: <ProtectedRoute><GoalScreen /></ProtectedRoute>,
  },
  {
    path: '/onboarding/calories',
    element: <ProtectedRoute><CaloriesScreen /></ProtectedRoute>,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><App /></ProtectedRoute>,
  },
  {
    path: '/profile',
    element: <ProtectedRoute><ProfileScreen /></ProtectedRoute>,
  },
  {
    path: '/profile/edit',
    element: <ProtectedRoute><EditProfileScreen /></ProtectedRoute>,
  },
  {
    path: '/profile/edit-goals',
    element: <ProtectedRoute><EditGoalsScreen /></ProtectedRoute>,
  },
  {
    path: '/profile/change-password',
    element: <ProtectedRoute><ChangePasswordScreen /></ProtectedRoute>,
  },
])
