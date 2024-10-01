import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  Query,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from 'firebase/firestore';

import { FirestoreCollections } from '@/shared/constants/firebase';
import type {
  FirestoreObj,
  GetByIdProps,
  GetOperationReturnType,
  GetOperationType,
  PaginatedQueryResult,
  QueryExtendFunction,
} from '@/shared/types/firestore';

import { firestore } from '../api/firebase';
import { SCROLL_MAX_VISIBLE_ITEMS } from '../constants/observer';

export const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as T,
});

export const getDocRef = <TDoc extends FirestoreObj>(
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

export const getDocSnap = async <TDoc extends FirestoreObj>(
  path: FirestoreCollections,
  id: string
) => {
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

export const getPaginatedQuery = async <T extends FirestoreObj>(
  path: FirestoreCollections,
  sort?: boolean,
  startAfterDocId?: string,
  extendQuery?: QueryExtendFunction<T>
): PaginatedQueryResult<T> => {
  const collectionRef = getCollectionRef<T>(path);

  let baseQuery = query(collectionRef, limit(SCROLL_MAX_VISIBLE_ITEMS));

  if (sort) {
    baseQuery = query(baseQuery, orderBy('createdAt', 'desc'));
  }

  if (startAfterDocId) {
    const startAfterDoc = await getDocSnap(path, startAfterDocId);
    baseQuery = query(baseQuery, startAfter(startAfterDoc));
  }

  baseQuery = extendQuery?.(baseQuery) ?? baseQuery;

  const collection = await getData(baseQuery);

  let lastDocId = '';

  if (collection) {
    lastDocId = collection[collection.length - 1].uid;
  }

  return [collection, lastDocId];
};
