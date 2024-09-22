import type { ImageWithKey } from './image';
import type { UserDoc } from './user';

type TweetDoc = {
  uid: string;
  content?: string;
  createdAt: number;
  likes: string[];
  author: string;
  media: string[];
};

type TweetType = Omit<TweetDoc, 'author' | 'likes'> & {
  author: UserDoc;
  isLiked: boolean;
  likesCount: number;
};

type CreateTweetFormType = {
  content?: string;
  media?: ImageWithKey[];
};

type TweetPaginateMeta = {
  startAfterDocId?: string;
  targetUser?: UserDoc;
  page?: number;
};

type TweetPaginate = {
  tweets: TweetType[];
  hasMore: boolean;
  lastDocId?: string;
};

export type { CreateTweetFormType, TweetDoc, TweetPaginate, TweetPaginateMeta, TweetType };
