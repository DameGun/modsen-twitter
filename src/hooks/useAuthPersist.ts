import { useEffect, useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '@/services/firebase';
import { UsersRepositoryService } from '@/services/firestore/users';
import { setCurrentUser } from '@/services/store/user';

import { useAppDispatch } from './store';
import { useAsyncWithLoading } from './useAsyncWithLoading';

export function useAuthPersist() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  const { call } = useAsyncWithLoading({
    call: UsersRepositoryService.getUserById,
  });

  const getUserDoc = async (userId: string) => {
    const userDoc = await call(userId);

    if (userDoc) {
      dispatch(setCurrentUser(userDoc));
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserDoc(user.uid);
      } else {
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { isLoading, isAuthenticated };
}
