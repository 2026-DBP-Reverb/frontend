import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getMyProfile } from '../api/memberApi';

export default function RedirectIfAuthenticated() {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function checkAuthentication() {
      try {
        await getMyProfile();

        if (isMounted) {
          setIsAuthenticated(true);
        }
      } catch {
        if (isMounted) {
          setIsAuthenticated(false);
        }
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    }

    checkAuthentication();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isChecking) {
    return null;
  }

  return isAuthenticated ? <Navigate to="/home" replace/> : <Outlet/>;
}
