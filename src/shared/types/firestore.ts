import type { DocumentReference } from 'firebase/firestore';

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

export type { FirestoreObj, GetByIdProps, GetOperationReturnType, GetOperationType };
