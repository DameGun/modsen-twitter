import { runTransaction } from 'firebase/firestore';

import type { UserDoc, UserSubcriptionProps } from '@/entities/user/types';
import { firebaseApi } from '@/shared/api';
import { FirestoreCollections } from '@/shared/constants/firebase';
import { getDocRef } from '@/shared/lib/firestore';

export async function manageUserSubscription(
  { uid, targetUid }: UserSubcriptionProps,
  currentUserFollowings: string[],
  targetUserFollowers: (targetUser: UserDoc) => string[]
) {
  const userDocRef = getDocRef<UserDoc>(FirestoreCollections.Users, uid);
  const targetDocRef = getDocRef<UserDoc>(FirestoreCollections.Users, targetUid);

  const updatedUser: Partial<UserDoc> = {
    following: currentUserFollowings,
  };

  await runTransaction(firebaseApi.firestore, async (transaction) => {
    const targetUserDoc = await transaction.get(targetDocRef);

    const targetUser = targetUserDoc.data();

    if (targetUser) {
      const updatedTargetUser: Partial<UserDoc> = {
        followers: targetUserFollowers(targetUser),
      };

      transaction.update(userDocRef, updatedUser);
      transaction.update(targetDocRef, updatedTargetUser);
    }
  });

  return updatedUser;
}
