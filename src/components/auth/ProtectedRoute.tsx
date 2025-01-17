import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BaseProps } from '../../types';

interface ProtectedRouteProps extends BaseProps {
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}