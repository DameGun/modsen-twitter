import { User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { FirestoreCollections } from '@/constants/firebase';
import { firestore } from '@/services/firebase';
import type { UserCreate } from '@/types/auth';

export async function createUser(userResponse: User, userData: Partial<UserCreate>) {
  const userDoc = {
    uid: userResponse.uid,
    ...userData,
    bio: '',
    profilePicURL: userResponse.photoURL,
    followers: [],
    following: [],
    tweets: [],
    createdAt: Date.now(),
  };

  await setDoc(doc(firestore, FirestoreCollections.Users, userResponse.uid), userDoc);
}
