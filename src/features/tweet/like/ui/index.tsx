import { MouseEvent } from 'react';

import { formatTweetLikesCount, useLikeTweetMutation } from '@/entities/tweet';
import type { TweetType } from '@/entities/tweet/types';
import { LikeIcon, LikeIconFilled } from '@/shared/assets/icons';
import { Paragraph, StyledIcon } from '@/shared/ui';

import { StyledTweetLike, TweetLikeWrapper } from './styled';

type TweetLikeProps = Pick<TweetType, 'isLiked' | 'likesCount' | 'uid'>;

export function TweetLike({ isLiked, likesCount, uid }: TweetLikeProps) {
  const [likeTweet] = useLikeTweetMutation();
  const handleTweetLike = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    likeTweet(uid);
  };

  return (
    <TweetLikeWrapper $align='center' $isLiked={isLiked}>
      <StyledTweetLike variant='icon' $isLiked={isLiked} onClick={handleTweetLike}>
        <StyledIcon $size='xs' $notInvertColor>
          {isLiked ? <LikeIconFilled /> : <LikeIcon />}
        </StyledIcon>
      </StyledTweetLike>
      <Paragraph color='textSecondary' weight='semibold' size='sm'>
        {formatTweetLikesCount(likesCount)}
      </Paragraph>
    </TweetLikeWrapper>
  );
}
