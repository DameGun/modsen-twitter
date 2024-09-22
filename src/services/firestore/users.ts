import {
  getDoc,
  getDocs,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

import { FirestoreCollections, StoragePaths } from '@/constants/firebase';
import type {
  UpdateUserProps,
  UserConnectionsProps,
  UserDoc,
  UserSubcriptionProps,
} from '@/types/user';
import { getCollectionRef, getDocRef } from '@/utils/firestore';

import { ImageRepositoryService } from './image';

import { firestore } from '../firebase';

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

  static async followUser({ targetUid, uid, previousFollowing }: UserSubcriptionProps) {
    const userDocRef = getDocRef<UserDoc>(FirestoreCollections.Users, uid);
    const targetDocRef = getDocRef<UserDoc>(FirestoreCollections.Users, targetUid);

    const updatedUser: Partial<UserDoc> = { following: [...previousFollowing, targetUid] };

    await runTransaction(firestore, async (transaction) => {
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

  static async unfollowUser({ targetUid, uid, previousFollowing }: UserSubcriptionProps) {
    const userDocRef = getDocRef<UserDoc>(FirestoreCollections.Users, uid);
    const targetDocRef = getDocRef<UserDoc>(FirestoreCollections.Users, targetUid);

    const updatedUser: Partial<UserDoc> = {
      following: previousFollowing.filter((userId) => userId !== targetUid),
    };

    await runTransaction(firestore, async (transaction) => {
      const targetUserDoc = await transaction.get(targetDocRef);

      const targetUser = targetUserDoc.data();

      if (targetUser) {
        const updatedTargetUser: Partial<UserDoc> = {
          followers: targetUser.followers.filter((userId) => userId !== uid),
        };

        transaction.update(userDocRef, updatedUser);
        transaction.update(targetDocRef, updatedTargetUser);
      }
    });

    return updatedUser;
  }

  static async getUserConnections({ userName, connectionType }: UserConnectionsProps) {
    const user = await UsersRepositoryService.getUserByUserName(userName);

    if (user) {
      const connections: UserDoc[] = [];
      const connectionsIds = user[connectionType];

      for (const id of connectionsIds) {
        const connection = await UsersRepositoryService.getUserById(id);

        if (connection) connections.push(connection);
      }

      return connections;
    }

    return undefined;
  }
}
