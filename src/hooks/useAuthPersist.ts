import { useEffect, useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '@/services/firebase';

export function useAuthPersist() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setIsAuthenticated(true);
      else setIsAuthenticated(false);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { isLoading, isAuthenticated };
}
