import { UserDoc } from '@/entities/user/types';
import { PaginateResult } from '@/shared/types/observer';
import { AppDispatch } from '@/shared/types/store';

import { setOrRemoveLike } from './likes';

import { getTweetByIdApiSlice } from '../api/getTweetById';
import { getTweetsApiSlice } from '../api/getTweets';
import type { TweetDoc, TweetType } from '../types';

export function updateMainTweetsCache(
  dispatch: AppDispatch,
  updateRecipe: (draft: PaginateResult<TweetType>) => void | PaginateResult<TweetType>
) {
  dispatch(getTweetsApiSlice.util.updateQueryData('getTweets', {}, updateRecipe));
}

export function updateBothTweetsCache(
  dispatch: AppDispatch,
  targetUser: UserDoc,
  updateRecipe: (draft: PaginateResult<TweetType>) => void | PaginateResult<TweetType>
) {
  dispatch(getTweetsApiSlice.util.updateQueryData('getTweets', { targetUser }, updateRecipe));
  dispatch(getTweetsApiSlice.util.updateQueryData('getTweets', {}, updateRecipe));
}

export function updateCurrentDisplayedTweetLikes(
  dispatch: AppDispatch,
  updatedTweet: TweetDoc,
  currentUserUid: string
) {
  dispatch(
    getTweetByIdApiSlice.util.updateQueryData('getTweetById', updatedTweet.uid, (draft) => {
      setOrRemoveLike(draft, updatedTweet.likes, currentUserUid);
    })
  );
}
