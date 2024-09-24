import type { DocumentData, DocumentReference, Query } from 'firebase/firestore';

import { FirestoreCollections } from '../constants/firebase';

type FirestoreObj = {
  uid: string;
};

type GetOperationType<TDoc> = { data: TDoc; ref: DocumentReference };

type GetOperationReturnType<TDoc> = Promise<TDoc | undefined>;

type GetByIdProps = {
  path: FirestoreCollections;
  id: string;
};

type PaginatedQueryResult<T> = Promise<[T[] | undefined, string | undefined]>;

type QueryExtendFunction<T extends DocumentData> = (baseQuery: Query<T, T>) => Query<T, T>;

export type {
  FirestoreObj,
  GetByIdProps,
  GetOperationReturnType,
  GetOperationType,
  PaginatedQueryResult,
  QueryExtendFunction,
};
