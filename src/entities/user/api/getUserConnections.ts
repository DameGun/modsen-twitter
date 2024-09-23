import { FirestoreCollections } from '@/shared/constants/firebase';
import { getDataById } from '@/shared/lib/firestore';

import { getUserByUserName } from './getUserByUserName';

import type { UserConnectionsProps, UserDoc } from '../types';

export async function getUserConnections({ userName, connectionType }: UserConnectionsProps) {
  const user = await getUserByUserName(userName);

  if (user) {
    const connections: UserDoc[] = [];
    const connectionsIds = user[connectionType];

    for (const id of connectionsIds) {
      const connection = await getDataById<UserDoc>({ path: FirestoreCollections.Users, id: id });

      if (connection) connections.push(connection.data);
    }

    return connections;
  }

  return undefined;
}
