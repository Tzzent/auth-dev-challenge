import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { useContext } from 'react';

import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import Auth from './pages/Auth';
import Edit from './pages/Edit';
import Group from './pages/Group';
import Home from './pages/Home';
import ProtectedRoute from '../src/auth/ProtectedRoute';
import { AuthCtx } from '../src/auth/context/AuthCtx';
import Loading from '../src/pages/Loading';

export default function App() {
  const {
    isAuthenticated,
    loading,
  } = useContext(AuthCtx);

  const router = createBrowserRouter([
    {
      path: '/auth',
      element: (
        (isAuthenticated)
          ? (<Navigate to={'/'} />)
          : (<Auth />)
      )
    },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'group-chat',
          element: <Group />
        },
        {
          path: 'edit',
          element: <Edit />
        },
      ]
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]);

  if (loading) {
    return <Loading />
  }

  return (
    <RouterProvider router={router} />
  )
}