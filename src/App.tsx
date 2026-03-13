import { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DashboardLayout } from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import UsersPage from './pages/UsersPage'
import ContentPage from './pages/ContentPage'
import FeedPage from './pages/FeedPage'
import SettingsPage from './pages/SettingsPage'
import BadgesPage from './pages/BadgesPage'
import UserDetailPage from './pages/UserDetailPage'
import { backendService } from './services/backendService'
import { Loader2 } from 'lucide-react'

const router = createBrowserRouter([
  
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'users/:id', element: <UserDetailPage /> },
      { path: 'content', element: <ContentPage /> },
      { path: 'feed', element: <FeedPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'badges', element: <BadgesPage /> },
    ],
  },
])

function App() {
  const [isInitializing, setIsInitializing] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initApp = async () => {
      try {
        console.log('Verifying Supabase connection...')
        // Fetch a  data to verify connection
        await backendService.getCategories()
        console.log('Connected to Supabase successfully')
        setIsInitializing(false)
      } catch (err) {
        console.error(' Database connection failed:', err)
        setError('Failed to connect to the live database. Please check your connection or environment variables.')
        setIsInitializing(false)
      }
    }

    initApp()
  }, [])

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-ping"></div>
          </div>
        </div>
        <h2 className="mt-8 text-xl font-bold text-gray-900">Motive Admin Panel</h2>
        <p className="mt-2 text-gray-500 font-medium">Connecting to live database...</p>
        <div className="mt-6 flex items-center gap-2 text-xs text-gray-400 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
          <Loader2 className="w-3 h-3 animate-spin" />
          Verifying Supabase instance
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Connection Error</h1>
        <p className="text-gray-600 max-w-md mb-8">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
        >
          Try Again
        </button>
      </div>
    )
  }

  return <RouterProvider router={router} />
}

export default App
