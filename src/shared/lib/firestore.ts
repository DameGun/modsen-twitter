import { collection, doc, getDoc, getDocs, Query, QueryDocumentSnapshot } from 'firebase/firestore';

import { FirestoreCollections } from '@/shared/constants/firebase';
import type {
  FirestoreObj,
  GetByIdProps,
  GetOperationReturnType,
  GetOperationType,
} from '@/shared/types/firestore';

import { firestore } from '../api/firebase';

export const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as T,
});

export const getDocRef = <TDoc extends object>(
  path: FirestoreCollections,
  ...additionalParams: string[]
) => {
  return doc(firestore, path, ...additionalParams).withConverter(converter<TDoc>());
};

export const getCollectionRef = <TDoc extends object>(path: FirestoreCollections) => {
  return collection(firestore, path).withConverter(converter<TDoc>());
};

export const getDataById = async <TDoc extends FirestoreObj>({
  path,
  id,
}: GetByIdProps): GetOperationReturnType<GetOperationType<TDoc>> => {
  const docRef = getDocRef<TDoc>(path, id);
  const doc = await getDoc(docRef);

  if (doc.exists()) return { data: { ...doc.data(), uid: doc.id }, ref: docRef };

  return undefined;
};

export const getDocSnap = async <TDoc extends object>(path: FirestoreCollections, id: string) => {
  const docRef = getDocRef<TDoc>(path, id);
  return await getDoc(docRef);
};

export const getData = async <TDoc extends FirestoreObj>(
  query: Query<TDoc, TDoc>
): GetOperationReturnType<TDoc[]> => {
  const querySnap = await getDocs(query);

  if (!querySnap.empty) {
    return querySnap.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));
  }

  return undefined;
};
