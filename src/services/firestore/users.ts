import { getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';

import { FirestoreCollections } from '@/constants/firebase';
import { UserDoc } from '@/types/user';
import { getCollectionRef, getDocRef } from '@/utils/firestore';

export class UsersRepositoryService {
  static async getUserById(id: string) {
    const docRef = getDocRef<UserDoc>(FirestoreCollections.Users, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error(`User with id: ${id} not exist`);
    }
  }

  static async getUserByUserName(userName: string) {
    const usersRef = getCollectionRef<UserDoc>(FirestoreCollections.Users);
    const userQuery = query(usersRef, where('userName', '==', userName));

    const querySnap = await getDocs(userQuery);

    if (!querySnap.empty) {
      return querySnap.docs[0].data();
    } else {
      throw new Error(`User with userName: ${userName} not exist`);
    }
  }

  static async createUser(userObj: Partial<UserDoc>) {
    userObj.createdAt = Date.now();

    const docRef = getDocRef<UserDoc>(FirestoreCollections.Users, userObj.uid!);

    await setDoc(docRef, userObj);
  }
}
