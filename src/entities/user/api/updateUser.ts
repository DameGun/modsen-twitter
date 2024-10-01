import { updateDoc } from 'firebase/firestore';

import { uploadImageByPath } from '@/shared/api';
import { FirestoreCollections, StoragePaths } from '@/shared/constants/firebase';
import { getDocRef } from '@/shared/lib/firestore';

import type { UpdateUserProps, UserDoc } from '../types';

export async function updateUser({ uid, userObj }: UpdateUserProps) {
  const userDocRef = getDocRef<UserDoc>(FirestoreCollections.Users, uid);

  const updatedUser: Partial<UserDoc> = userObj;

  if (userObj.avatarUrl) {
    updatedUser.avatarUrl = await uploadImageByPath(
      userObj.avatarUrl,
      StoragePaths.usersAvatars(uid)
    );
  }
  if (userObj.backgroundImageUrl) {
    updatedUser.backgroundImageUrl = await uploadImageByPath(
      userObj.backgroundImageUrl,
      StoragePaths.usersBackgrounds(uid)
    );
  }

  await updateDoc(userDocRef, updatedUser);

  return updatedUser;
}
