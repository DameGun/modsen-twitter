export enum FirestoreCollections {
  Users = 'users',
  Tweets = 'tweets',
}

export const StoragePaths = {
  usersAvatars: (uid: string) => `usersAvatars/${uid}`,
  usersBackgrounds: (uid: string) => `usersBackgrounds/${uid}`,
  tweetsMedia: (tweetId: string, imageId: number) => `tweetsMedia/${tweetId}/image${imageId}`,
  tweetsMediaRoot: (tweetId: string) => `tweetsMedia/${tweetId}`,
} as const;
