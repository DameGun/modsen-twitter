import { store } from '@/shared/store';

import { getTweetByIdApiSlice } from '../api/getTweetById';
import { TweetDoc, TweetType } from '../types';

export function updateCurrentDisplayedTweetLikes(updatedTweet: TweetDoc, currentUserUid: string) {
  store.dispatch(
    getTweetByIdApiSlice.util.updateQueryData('getTweetById', updatedTweet.uid, (draft) => {
      setOrRemoveLike(draft, updatedTweet.likes, currentUserUid);
    })
  );
}

export function getExtendedTweetLikes(userId: string, likes: string[]): [boolean, number] {
  const isLiked = likes.includes(userId);
  const likesCount = likes.length;

  return [isLiked, likesCount];
}

export function setOrRemoveLike(tweet: TweetType, updatedLikes: string[], currentUserUid: string) {
  tweet.isLiked = updatedLikes.includes(currentUserUid);
  tweet.likesCount = updatedLikes.length;
}
