export enum FirestoreCollections {
  Users = 'users',
}

export const StoragePaths = {
  usersAvatars: (uid: string) => `usersAvatars/${uid}`,
  usersBackgrounds: (uid: string) => `usersBackgrounds/${uid}`,
} as const;
