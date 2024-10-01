import { findOrAddUserInCache } from '@/entities/user';
import type { UserDoc } from '@/entities/user/types';
import { store } from '@/shared/store';

import { getExtendedTweetLikes } from './likes';

import type { TweetDoc, TweetType } from '../types';

export async function mapTweetDoc(
  tweet: TweetDoc,
  targetUser?: UserDoc
): Promise<TweetType | undefined> {
  const currentUser = store.getState().user.currentUser!;
  let author: UserDoc | undefined;

  if (targetUser) {
    author = targetUser;
  } else {
    author = await findOrAddUserInCache(tweet.author);
  }

  const [isLiked, likesCount] = getExtendedTweetLikes(currentUser.uid, tweet.likes);

  if (author) {
    return { ...tweet, uid: tweet.uid, author, isLiked, likesCount };
  }

  return undefined;
}
