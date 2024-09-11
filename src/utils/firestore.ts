import { collection, doc, QueryDocumentSnapshot } from 'firebase/firestore';

import { FirestoreCollections } from '@/constants/firebase';
import { firestore } from '@/services/firebase';

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
