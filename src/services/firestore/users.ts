import { getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';

import { FirestoreCollections, StoragePaths } from '@/constants/firebase';
import type { UpdateUserProps, UserDoc } from '@/types/user';
import { getCollectionRef, getDocRef } from '@/utils/firestore';

import { ImageRepositoryService } from './image';

export class UsersRepositoryService {
  static async getUserById(id: string) {
    const docRef = getDocRef<UserDoc>(FirestoreCollections.Users, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }

    return undefined;
  }

  static async getUserByUserName(userName: string) {
    const usersRef = getCollectionRef<UserDoc>(FirestoreCollections.Users);
    const userQuery = query(usersRef, where('userName', '==', userName));

    const querySnap = await getDocs(userQuery);

    if (!querySnap.empty) {
      return querySnap.docs[0].data();
    }

    return undefined;
  }

  static async createUser(userObj: Partial<UserDoc>) {
    userObj.createdAt = Date.now();

    const docRef = getDocRef<UserDoc>(FirestoreCollections.Users, userObj.uid!);

    await setDoc(docRef, userObj);
  }

  static async updateUser({ uid, userObj }: UpdateUserProps) {
    const userDocRef = getDocRef<UserDoc>(FirestoreCollections.Users, uid);

    const updatedUser: Partial<UserDoc> = userObj;

    if (userObj.avatarUrl) {
      updatedUser.avatarUrl = await ImageRepositoryService.uploadImageByPath(
        userObj.avatarUrl,
        StoragePaths.usersAvatars(uid)
      );
    }
    if (userObj.backgroundImageUrl) {
      updatedUser.backgroundImageUrl = await ImageRepositoryService.uploadImageByPath(
        userObj.backgroundImageUrl,
        StoragePaths.usersBackgrounds(uid)
      );
    }

    await updateDoc(userDocRef, updatedUser);

    return updatedUser;
  }
}
