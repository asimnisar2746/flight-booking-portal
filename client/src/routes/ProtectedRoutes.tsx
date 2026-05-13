import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../utils/auth";
import { refreshAccessToken } from "../api/auth";
import {
  setAccessToken,
  getAccessToken,
  removeAccessToken,
} from "../utils/token";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getAccessToken();

      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      if (!isTokenExpired(token)) {
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      // Token is expired, try to refresh
      try {
        const data = await refreshAccessToken();
        setAccessToken(data.accessToken);
        setIsAuthenticated(true);
      } catch (error) {
        removeAccessToken();
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
