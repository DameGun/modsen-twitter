import { MouseEvent } from 'react';

import { LikeIcon, LikeIconFilled } from '@/assets/icons';
import { Paragraph, StyledIcon } from '@/components/ui';
import { useLikeTweetMutation } from '@/services/store/tweets/likeTweet';
import { TweetType } from '@/types/tweet';
import { formatTweetLikesCount } from '@/utils/tweet';

import { StyledTweetLike, TweetLikeWrapper } from './styled';

type TweetLikeProps = Pick<TweetType, 'isLiked' | 'likesCount' | 'uid'>;

export function TweetLike({ isLiked, likesCount, uid }: TweetLikeProps) {
  const [likeTweet] = useLikeTweetMutation();
  const handleTweetLike = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    likeTweet(uid);
  };

  return (
    <TweetLikeWrapper align='center' $isLiked={isLiked}>
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
