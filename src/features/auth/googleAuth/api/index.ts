import { signInWithPopup } from 'firebase/auth';

import { createUser } from '@/entities/user';
import type { UserDoc } from '@/entities/user/types';
import { firebaseApi } from '@/shared/api';
import { FirestoreCollections } from '@/shared/constants/firebase';
import { getDataById } from '@/shared/lib/firestore';

export async function signInWithGoogle() {
  const { user } = await signInWithPopup(firebaseApi.auth, firebaseApi.provider);

  const dbUser = await getDataById<UserDoc>({ path: FirestoreCollections.Users, id: user.uid });

  if (!dbUser) {
    const userData: Partial<UserDoc> = {
      uid: user.uid,
      email: user.email!,
      fullName: user.displayName!,
      userName: user.email!.split('@')[0],
      avatarUrl: user.photoURL!,
      followers: [],
      following: [],
    };
    await createUser(userData);
  }
}
