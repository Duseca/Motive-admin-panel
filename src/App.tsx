import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DashboardLayout } from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import UsersPage from './pages/UsersPage'
import ContentPage from './pages/ContentPage'
import FeedPage from './pages/FeedPage'
import SettingsPage from './pages/SettingsPage'
import BadgesPage from './pages/BadgesPage'
import UserDetailPage from './pages/UserDetailPage'

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
        path: 'users/:id',
        element: <UserDetailPage />,
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
      {
        path: 'badges',
        element: <BadgesPage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
