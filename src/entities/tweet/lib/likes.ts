import type { TweetType } from '../types';

export function getExtendedTweetLikes(userId: string, likes: string[]): [boolean, number] {
  const isLiked = likes.includes(userId);
  const likesCount = likes.length;

  return [isLiked, likesCount];
}

export function setOrRemoveLike(tweet: TweetType, updatedLikes: string[], currentUserUid: string) {
  tweet.isLiked = updatedLikes.includes(currentUserUid);
  tweet.likesCount = updatedLikes.length;
}
