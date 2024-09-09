import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';

import {
  type AuthError,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { AuthResponseErrors } from '@/constants/auth';
import { FirestoreCollections } from '@/constants/firebase';
import { auth, firestore, provider } from '@/services/firebase';
import type { UserCreate, UserLogin } from '@/types/auth';
import { createUser } from '@/utils/auth';

interface FirebaseAuthHookProps {
  handleError(message: string): void;
}

export function useAuth({ handleError }: FirebaseAuthHookProps) {
  const [isLoading, setIsLoading] = useState(false);

  const signInEmail: SubmitHandler<UserLogin> = async ({ email, password }) => {
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const authError = err as AuthError;

      if (authError.code === AuthResponseErrors.INVALID_CREDENTIALS) {
        handleError('Invalid credentials provided');
      }
    }

    setIsLoading(false);
  };

  const signUpEmail: SubmitHandler<UserCreate> = async (userData) => {
    setIsLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      await createUser(user, userData);
    } catch (err) {
      const authError = err as AuthError;

      if (authError.code === AuthResponseErrors.EMAIL_IN_USE) {
        handleError('Email is already in use');
      }
    }

    setIsLoading(false);
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);

    try {
      const { user } = await signInWithPopup(auth, provider);

      const docRef = doc(firestore, FirestoreCollections.Users, user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        const userData: Partial<UserCreate> = {
          email: user.email!,
          fullName: user.displayName!,
          userName: user.email?.split('@')[0],
        };

        await createUser(user, userData);
      }
    } catch (err) {
      const authError = err as AuthError;

      handleError(authError.message);
    }

    setIsLoading(false);
  };

  return { isLoading, signInEmail, signUpEmail, signInWithGoogle };
}
