import {
  ReactNode,
  useContext,
} from 'react';
import {
  Navigate,
  useLocation,
} from 'react-router-dom';

import { AuthCtx } from '../auth/context/AuthCtx';

interface ProtectedRouteProps {
  children: ReactNode,
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const {
    isAuthenticated,
    user,
  } = useContext(AuthCtx);
  const location = useLocation();

  return (
    <>
      {(isAuthenticated && user)
        ? children
        : <Navigate
          to={'/auth'}
          state={{ from: location }}
          replace
        />}
    </>
  )
}