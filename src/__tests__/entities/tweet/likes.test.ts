import { getExtendedTweetLikes, setOrRemoveLike } from '@/entities/tweet/lib/likes';
import type { TweetType } from '@/entities/tweet/types';

describe('Tweet likes functions', () => {
  describe('getExtendedTweetLikes', () => {
    it('should return correct like status and count', () => {
      const userId = 'user1';
      const likes = ['user1', 'user2', 'user3'];

      const [isLiked, likesCount] = getExtendedTweetLikes(userId, likes);

      expect(isLiked).toBe(true);
      expect(likesCount).toBe(3);
    });

    it('should return false for isLiked when user has not liked', () => {
      const userId = 'user4';
      const likes = ['user1', 'user2', 'user3'];

      const [isLiked, likesCount] = getExtendedTweetLikes(userId, likes);

      expect(isLiked).toBe(false);
      expect(likesCount).toBe(3);
    });
  });

  describe('setOrRemoveLike', () => {
    it('should set like correctly', () => {
      const tweet = { isLiked: false, likesCount: 0 } as TweetType;
      const updatedLikes = ['user1'];
      const currentUserUid = 'user1';

      setOrRemoveLike(tweet, updatedLikes, currentUserUid);

      expect(tweet.isLiked).toBe(true);
      expect(tweet.likesCount).toBe(1);
    });

    it('should remove like correctly', () => {
      const tweet = { isLiked: true, likesCount: 1 } as TweetType;
      const updatedLikes: string[] = [];
      const currentUserUid = 'user1';

      setOrRemoveLike(tweet, updatedLikes, currentUserUid);

      expect(tweet.isLiked).toBe(false);
      expect(tweet.likesCount).toBe(0);
    });
  });
});
