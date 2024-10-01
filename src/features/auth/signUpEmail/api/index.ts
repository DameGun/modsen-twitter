import { createUserWithEmailAndPassword } from 'firebase/auth';

import { createUser } from '@/entities/user';
import type { UserDoc } from '@/entities/user/types';
import { UserCreate } from '@/entities/user/types/auth';
import { firebaseApi } from '@/shared/api';

export async function signUpEmail(userData: UserCreate) {
  const { user } = await createUserWithEmailAndPassword(
    firebaseApi.auth,
    userData.email,
    userData.password
  );

  const userToCreate: Partial<UserDoc> = {
    uid: user.uid,
    email: userData.email,
    fullName: userData.fullName,
    userName: userData.userName,
    dateOfBirth: userData.dateOfBirth.valueOf(),
  };

  await createUser(userToCreate);
}
