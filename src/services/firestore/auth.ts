import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

import type { UserCreate, UserDoc, UserLogin } from '@/types/user';

import { UsersRepositoryService } from './users';

import { auth, provider } from '../firebase';

export class AuthService {
  static async signInEmail({ email, password }: UserLogin) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  static async signUpEmail(userData: UserCreate) {
    const { user } = await createUserWithEmailAndPassword(auth, userData.email, userData.password);

    const userToCreate: Partial<UserDoc> = {
      uid: user.uid,
      email: userData.email,
      fullName: userData.fullName,
      userName: userData.userName,
      dateOfBirth: userData.dateOfBirth.valueOf(),
      photoUrl: '',
    };

    await UsersRepositoryService.createUser(userToCreate);
  }

  static async signInWithGoogle() {
    const { user } = await signInWithPopup(auth, provider);

    const userDocSnap = await UsersRepositoryService.getUserById(user.uid);

    if (!userDocSnap) {
      const userData: Partial<UserDoc> = {
        uid: user.uid,
        email: user.email!,
        fullName: user.displayName!,
        userName: user.email!.split('@')[0],
        photoUrl: user.photoURL!,
      };

      await UsersRepositoryService.createUser(userData);
    }
  }
}
