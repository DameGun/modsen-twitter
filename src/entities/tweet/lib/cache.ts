import { getCurrentUser } from '@/entities/user';
import { store } from '@/shared/store';
import { PaginateResult } from '@/shared/types/observer';

import { getTweetsApiSlice } from '../api';
import type { TweetType } from '../types';

export function updateMainTweetsCache(
  updateRecipe: (draft: PaginateResult<TweetType>) => void | PaginateResult<TweetType>
) {
  store.dispatch(getTweetsApiSlice.util.updateQueryData('getTweets', {}, updateRecipe));
}

export function updateBothTweetsCache(
  updateRecipe: (draft: PaginateResult<TweetType>) => void | PaginateResult<TweetType>
) {
  const targetUser = getCurrentUser();

  store.dispatch(getTweetsApiSlice.util.updateQueryData('getTweets', { targetUser }, updateRecipe));
  store.dispatch(getTweetsApiSlice.util.updateQueryData('getTweets', {}, updateRecipe));
}
