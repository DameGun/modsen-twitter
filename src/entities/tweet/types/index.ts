import type { UserDoc } from '@/entities/user/types';
import type { FirestoreObj } from '@/shared/types/firestore';
import type { ImageWithKey } from '@/shared/types/image';

type TweetDoc = FirestoreObj & {
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

export type { CreateTweetFormType, TweetDoc, TweetType };
