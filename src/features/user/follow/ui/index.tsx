import { MouseEvent, useMemo } from 'react';

import {
  followUser,
  parseUserName,
  selectCurrentUser,
  unfollowUser,
  updateCurrentUser,
} from '@/entities/user';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import { useAsyncWithLoading } from '@/shared/lib/useAsyncWithLoading';
import { withLoader } from '@/shared/lib/withLoader';
import type { ManualLoadingHandleProps } from '@/shared/types/loader';
import * as Components from '@/shared/ui';

import { StyledFollowButton } from './styled';

type FollowButtonProps = ManualLoadingHandleProps & {
  targetUid: string;
  targetUserName: string;
};

function BaseFollowButton({ targetUid, targetUserName, handleLoading }: FollowButtonProps) {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const isFollowed = useMemo(
    () => currentUser.following.includes(targetUid),
    [currentUser, targetUid]
  );
  const { call } = useAsyncWithLoading({
    call: unfollowUser,
    handleLoading,
  });

  const handleFollowButton = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const updatedUser = await followUser({
      targetUid,
      uid: currentUser.uid,
      previousFollowing: currentUser.following,
    });

    dispatch(updateCurrentUser(updatedUser));
  };

  const handleUnfollowButton = async () => {
    const updatedUser = await call({
      targetUid,
      uid: currentUser.uid,
      previousFollowing: currentUser.following,
    });

    if (updatedUser) dispatch(updateCurrentUser(updatedUser));
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
