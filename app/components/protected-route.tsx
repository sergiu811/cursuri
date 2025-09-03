import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "~/contexts/auth-context";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function ProtectedRoute({
  children,
  requireAuth = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !isAuthenticated) {
        // User needs to be authenticated but isn't - redirect to login
        navigate("/login");
      } else if (!requireAuth && isAuthenticated) {
        // User is authenticated but shouldn't be on this page - redirect to dashboard
        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, loading, requireAuth, navigate]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If requireAuth is true, only show children if authenticated
  if (requireAuth && !isAuthenticated) {
    return null; // Will redirect to login
  }

  // If requireAuth is false, only show children if NOT authenticated
  if (!requireAuth && isAuthenticated) {
    return null; // Will redirect to dashboard
  }

  return <>{children}</>;
}
