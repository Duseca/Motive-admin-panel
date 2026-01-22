import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DashboardLayout } from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import UsersPage from './pages/UsersPage'
import ContentPage from './pages/ContentPage'
import FeedPage from './pages/FeedPage'
import SettingsPage from './pages/SettingsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'content',
        element: <ContentPage />,
      },
      {
        path: 'feed',
        element: <FeedPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
