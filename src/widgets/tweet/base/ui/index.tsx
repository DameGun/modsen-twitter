import { MouseEvent, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { formatTweetCreationTime } from '@/entities/tweet';
import { TweetType } from '@/entities/tweet/types';
import { Avatar, selectCurrentUser, UserName } from '@/entities/user';
import { DeleteTweet, TweetLike } from '@/features/tweet';
import { Routes } from '@/shared/constants/routes';
import { useAppSelector } from '@/shared/lib/store';
import { FlexContainer, Heading4, Paragraph, StyledLink } from '@/shared/ui';

import { TweetMediaWrapper, TweetWrapper } from './styled';

type TweetProps = {
  tweet: TweetType;
};

export function Tweet({ tweet }: TweetProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const withRedirect = useMemo(
    () => location.pathname === Routes.Tweet(tweet.author.userName, tweet.uid),
    [location]
  );
  const currentUser = useAppSelector(selectCurrentUser);

  const handleNavigate = () => {
    navigate(Routes.Tweet(tweet.author.userName, tweet.uid), { state: tweet });
  };

  const handleNameClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  return (
    <TweetWrapper $gap='sm' onClick={handleNavigate}>
      <FlexContainer $noShrink>
        <Avatar url={tweet.author.avatarUrl} />
      </FlexContainer>
      <FlexContainer $fullWidth $direction='column' $gap='sm'>
        <FlexContainer $justify='space-between'>
          <FlexContainer $align='center' $gap='sm'>
            <StyledLink
              $color='textMain'
              to={Routes.Profile(tweet.author.userName)}
              state={tweet.author}
              onClick={handleNameClick}
            >
              <Heading4 $weight='bold'>{tweet.author.fullName}</Heading4>
            </StyledLink>
            <UserName userName={tweet.author.userName} />
            &#x2022;
            <Paragraph $color='textSecondary'>{formatTweetCreationTime(tweet.createdAt)}</Paragraph>
          </FlexContainer>
          {tweet.author.uid === currentUser.uid && (
            <DeleteTweet tweetId={tweet.uid} withRedirect={withRedirect} isLoaderFullScreen />
          )}
        </FlexContainer>
        <FlexContainer>
          <Paragraph>{tweet.content}</Paragraph>
        </FlexContainer>
        <FlexContainer>
          {tweet.media.length > 0 && (
            <TweetMediaWrapper $itemsCount={tweet.media.length}>
              {tweet.media.map((url, index) => (
                <img key={index} src={url} alt='Tweet media' />
              ))}
            </TweetMediaWrapper>
          )}
        </FlexContainer>
        <FlexContainer>
          <TweetLike {...tweet} />
        </FlexContainer>
      </FlexContainer>
    </TweetWrapper>
  );
}
