import type { DocumentReference } from 'firebase/firestore';

type FirestoreObj = {
  uid: string;
};

type GetOperationType<TDoc> = { data: TDoc; ref: DocumentReference };

type GetOperationReturnType<TDoc> = Promise<TDoc | undefined>;

export type { FirestoreObj, GetOperationReturnType, GetOperationType };
