import { runTransaction } from 'firebase/firestore';

import { firebaseApi } from '@/shared/api';
import { FirestoreCollections } from '@/shared/constants/firebase';
import { getDocRef } from '@/shared/lib/firestore';

import type { UserDoc, UserSubcriptionProps } from '../types';

export async function followUser({ targetUid, uid, previousFollowing }: UserSubcriptionProps) {
  const userDocRef = getDocRef<UserDoc>(FirestoreCollections.Users, uid);
  const targetDocRef = getDocRef<UserDoc>(FirestoreCollections.Users, targetUid);

  const updatedUser: Partial<UserDoc> = { following: [...previousFollowing, targetUid] };

  await runTransaction(firebaseApi.firestore, async (transaction) => {
    const targetUserDoc = await transaction.get(targetDocRef);

    const targetUser = targetUserDoc.data();

    if (targetUser) {
      const updatedTargetUser: Partial<UserDoc> = { followers: [...targetUser.followers, uid] };

      transaction.update(userDocRef, updatedUser);
      transaction.update(targetDocRef, updatedTargetUser);
    }
  });

  return updatedUser;
}
