import { MouseEvent, useMemo } from 'react';

import { parseUserName, selectCurrentUser } from '@/entities/user';
import { useAppSelector } from '@/shared/lib/store';
import { useQueryWithLoading } from '@/shared/lib/useQueryWithLoading';
import { withLoader } from '@/shared/lib/withLoader';
import type { ManualLoadingHandleProps } from '@/shared/types/loader';
import * as Components from '@/shared/ui';

import { StyledFollowButton } from './styled';

import { useFollowUserMutation, useUnfollowUserMutation } from '../api';

type FollowButtonProps = ManualLoadingHandleProps & {
  targetUid: string;
  targetUserName: string;
};

function BaseFollowButton({ targetUid, targetUserName, handleLoading }: FollowButtonProps) {
  const currentUser = useAppSelector(selectCurrentUser);
  const isFollowed = useMemo(
    () => currentUser.following.includes(targetUid),
    [currentUser, targetUid]
  );

  const [followUser] = useFollowUserMutation();
  const [unfollowUser, { isLoading }] = useUnfollowUserMutation();
  useQueryWithLoading({ isLoading, handleLoading });

  const handleFollowButton = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    await followUser(targetUid);
  };

  const handleUnfollowButton = async () => {
    await unfollowUser(targetUid);
  };

  return (
    <Components.Modal>
      <Components.ModalButton>
        {({ handleOpen }) =>
          targetUid !== currentUser.uid && (
            <StyledFollowButton
              $isFollowed={isFollowed}
              $variant={isFollowed ? 'outline' : 'filled'}
              onClick={isFollowed ? handleOpen() : handleFollowButton}
            >
              <Components.Paragraph $weight='semibold'>
                {isFollowed ? 'Following' : 'Follow'}
              </Components.Paragraph>
            </StyledFollowButton>
          )
        }
      </Components.ModalButton>
      <Components.ModalContent>
        <Components.ModalBody>
          {({ handleClose }) => (
            <Components.Container
              $align='left'
              $size='xs'
              $direction='column'
              $gap='md'
              $justify='center'
            >
              <Components.FlexContainer $direction='column' $gap='sm'>
                <Components.Heading3>Unfollow {parseUserName(targetUserName)}?</Components.Heading3>
                <Components.Paragraph $color='textSecondary'>
                  Their posts will no longer show up in your For You timeline. You can still view
                  their profile, unless their posts are protected.
                </Components.Paragraph>
              </Components.FlexContainer>

              <Components.FlexContainer $direction='column' $gap='sm'>
                <Components.StyledButton
                  $variant='filled'
                  onClick={handleClose(handleUnfollowButton)}
                >
                  <Components.Heading4>Unfollow</Components.Heading4>
                </Components.StyledButton>

                <Components.StyledButton $variant='outline' onClick={handleClose()}>
                  <Components.Heading4>Cancel</Components.Heading4>
                </Components.StyledButton>
              </Components.FlexContainer>
            </Components.Container>
          )}
        </Components.ModalBody>
      </Components.ModalContent>
    </Components.Modal>
  );
}

export const FollowButton = withLoader(BaseFollowButton);
