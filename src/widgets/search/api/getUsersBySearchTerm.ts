import { getDocs, query, where } from 'firebase/firestore';

import { UserDoc } from '@/entities/user/types';
import { apiSlice } from '@/shared/api';
import { FirestoreCollections } from '@/shared/constants/firebase';
import { getCollectionRef } from '@/shared/lib/firestore';

const getUsersBySearchTermSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsersBySearchTerm: builder.query<UserDoc[], string>({
      queryFn: async (queryValue) => {
        try {
          const usersCollections = getCollectionRef<UserDoc>(FirestoreCollections.Users);
          const userNameQuery = query(
            usersCollections,
            where('userName', '>=', queryValue),
            where('userName', '<=', queryValue + '\uf8ff')
          );

          const fullNameQuery = query(
            usersCollections,
            where('fullName', '>=', queryValue),
            where('fullName', '<=', queryValue + '\uf8ff')
          );

          const [userNameSnap, fullNameSnap] = await Promise.all([
            await getDocs(userNameQuery),
            await getDocs(fullNameQuery),
          ]);

          const uniqueUsers = new Set<UserDoc>();

          userNameSnap.forEach((doc) => uniqueUsers.add(doc.data()));
          fullNameSnap.forEach((doc) => uniqueUsers.add(doc.data()));

          return {
            data: Array.from(uniqueUsers),
          };
        } catch (error) {
          return {
            error,
          };
        }
      },
    }),
  }),
});

export const { useGetUsersBySearchTermQuery } = getUsersBySearchTermSlice;
