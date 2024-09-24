import { useEffect, useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';

import { setCurrentUser } from '@/entities/user/model';
import type { UserDoc } from '@/entities/user/types';

import { getDataById } from './firestore';
import { useAppDispatch } from './store';
import { useAsyncWithLoading } from './useAsyncWithLoading';

import { auth } from '../api/firebase';
import { FirestoreCollections } from '../constants/firebase';

export function useAuthPersist() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  const { call } = useAsyncWithLoading({
    call: getDataById<UserDoc>,
  });

  const getUserDoc = async (userId: string) => {
    const userDoc = await call({ path: FirestoreCollections.Users, id: userId });

    if (userDoc) {
      dispatch(setCurrentUser(userDoc.data));
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

    return () => {
      unsubscribe();
    };
  }, []);

  return { isLoading, isAuthenticated };
}
