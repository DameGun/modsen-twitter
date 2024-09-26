import { findOrAddUserInCache } from '@/entities/user';
import type { UserDoc } from '@/entities/user/types';
import { store } from '@/shared/store';

import { getExtendedTweetLikes } from './likes';

import type { TweetDoc, TweetType } from '../types';

export function formatTweetLikesCount(likesCount: number) {
  if (likesCount === 0) return undefined;

  return likesCount > 1000 ? `${likesCount / 1000}K` : likesCount;
}

export function formatTweetCreationTime(time: number) {
  const parsedDate = new Date(time);
  const currentDate = new Date();

  if (parsedDate.getFullYear() < currentDate.getFullYear()) {
    return parsedDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } else if (
    parsedDate.getMonth() === currentDate.getMonth() &&
    parsedDate.getDate() === currentDate.getDate()
  ) {
    const hoursDiff = currentDate.getHours() - parsedDate.getHours();
    const minutesDiff = currentDate.getMinutes() - parsedDate.getMinutes();

    if (hoursDiff === 0) {
      if (minutesDiff === 0) return 'Just now';

      return `${minutesDiff}m`;
    }

    return `${hoursDiff}h`;
  } else {
    return parsedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}

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
