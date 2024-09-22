import { UsersRepositoryService } from '@/services/firestore/users';
import { store } from '@/services/store';
import { getTweetsApiSlice } from '@/services/store/tweets/getTweets';
import type { TweetDoc, TweetPaginate, TweetType } from '@/types/tweet';
import type { UserDoc } from '@/types/user';

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

export function getExtendedTweetLikes(userId: string, likes: string[]): [boolean, number] {
  const isLiked = likes.includes(userId);
  const likesCount = likes.length;

  return [isLiked, likesCount];
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
    author = await UsersRepositoryService.getUserById(tweet.author);
  }

  const [isLiked, likesCount] = getExtendedTweetLikes(currentUser.uid, tweet.likes);

  if (author) {
    return { ...tweet, uid: tweet.uid, author, isLiked, likesCount };
  }

  return undefined;
}

export function updateMainTweetsCache(
  updateRecipe: (draft: TweetPaginate) => void | TweetPaginate
) {
  store.dispatch(getTweetsApiSlice.util.updateQueryData('getTweets', {}, updateRecipe));
}

export function updateBothTweetsCache(
  updateRecipe: (draft: TweetPaginate) => void | TweetPaginate
) {
  const targetUser = store.getState().user.currentUser!;

  store.dispatch(getTweetsApiSlice.util.updateQueryData('getTweets', { targetUser }, updateRecipe));
  store.dispatch(getTweetsApiSlice.util.updateQueryData('getTweets', {}, updateRecipe));
}
