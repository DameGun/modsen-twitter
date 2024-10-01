import { setDoc } from 'firebase/firestore';

import { FirestoreCollections } from '@/shared/constants/firebase';
import { getDocRef } from '@/shared/lib/firestore';

import { UserDoc } from '../types';

export async function createUser(userObj: Partial<UserDoc>) {
  userObj.createdAt = Date.now();

  const docRef = getDocRef<UserDoc>(FirestoreCollections.Users, userObj.uid!);

  await setDoc(docRef, userObj);
}
