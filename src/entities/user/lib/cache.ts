import { FirestoreCollections } from '@/shared/constants/firebase';
import { getDataById } from '@/shared/lib/firestore';
import { store } from '@/shared/store';

import { addToUsersCache } from '../model';
import type { UserDoc } from '../types';

export async function findOrAddUserInCache(userId: string) {
  const usersCache = store.getState().usersCache.users;
  let user = usersCache.find((user) => user.uid === userId);

  if (!user) {
    const result = await getDataById<UserDoc>({
      path: FirestoreCollections.Users,
      id: userId,
    });

    if (result) {
      user = result.data;
      store.dispatch(addToUsersCache(user));
    }
  }

  return user;
}
