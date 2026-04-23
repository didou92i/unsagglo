import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import PageLoader from "@/components/ui/PageLoader";

interface AdminProtectedRouteProps {
  children: ReactNode;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps): JSX.Element => {
  const { user, loading } = useAuth();

  if (loading) return <PageLoader />;
  if (!user) return <Navigate to="/admin/login" replace />;

  return <>{children}</>;
};

export default AdminProtectedRoute;
