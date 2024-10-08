import { fetchOrAddUserById, selectUserFromCacheById } from '@/entities/user';
import type { UserDoc } from '@/entities/user/types';
import { store } from '@/shared/store';

import { getExtendedTweetLikes } from './likes';

import type { TweetDoc, TweetType } from '../types';

export async function mapTweetDoc(
  tweet: TweetDoc,
  targetUser?: UserDoc
): Promise<TweetType | undefined> {
  const { getState, dispatch } = store;
  const state = getState();
  const currentUser = state.user.currentUser!;
  let author: UserDoc | undefined;

  if (targetUser) {
    author = targetUser;
  } else {
    let userInCache = selectUserFromCacheById(state, tweet.author);

    if (!userInCache) {
      userInCache = await dispatch(fetchOrAddUserById(tweet.author)).unwrap();
    }

    author = userInCache;
  }

  const [isLiked, likesCount] = getExtendedTweetLikes(currentUser.uid, tweet.likes);

  if (author) {
    return { ...tweet, uid: tweet.uid, author, isLiked, likesCount };
  }

  return undefined;
}
