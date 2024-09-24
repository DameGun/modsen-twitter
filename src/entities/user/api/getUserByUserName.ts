import { getDocs, query, where } from 'firebase/firestore';

import { FirestoreCollections } from '@/shared/constants/firebase';
import { getCollectionRef } from '@/shared/lib/firestore';

import type { UserDoc } from '../types';

export async function getUserByUserName(userName: string) {
  const usersRef = getCollectionRef<UserDoc>(FirestoreCollections.Users);
  const userQuery = query(usersRef, where('userName', '==', userName));

  const querySnap = await getDocs(userQuery);

  if (!querySnap.empty) {
    return querySnap.docs[0].data();
  }

  return undefined;
}
