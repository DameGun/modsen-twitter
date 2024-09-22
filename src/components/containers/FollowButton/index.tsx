import { MouseEvent, useMemo } from 'react';

import {
  Container,
  FlexContainer,
  Heading3,
  Heading4,
  Modal,
  ModalBody,
  ModalButton,
  ModalContent,
  Paragraph,
  StyledButton,
} from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { useAsyncWithLoading } from '@/hooks/useAsyncWithLoading';
import { UsersRepositoryService } from '@/services/firestore/users';
import { selectCurrentUser, updateCurrentUser } from '@/services/store/user';
import type { ManualLoadingHandleProps } from '@/types/loader';
import { parseUserName } from '@/utils/user';
import { withLoader } from '@/utils/withLoader';

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
    call: UsersRepositoryService.unfollowUser,
    handleLoading,
  });

  const handleFollowButton = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const updatedUser = await UsersRepositoryService.followUser({
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
    <Modal>
      <ModalButton>
        {({ handleOpen }) =>
          targetUid !== currentUser.uid && (
            <StyledFollowButton
              $isFollowed={isFollowed}
              variant={isFollowed ? 'outline' : 'filled'}
              onClick={isFollowed ? handleOpen() : handleFollowButton}
            >
              <Paragraph weight='semibold'>{isFollowed ? 'Following' : 'Follow'}</Paragraph>
            </StyledFollowButton>
          )
        }
      </ModalButton>
      <ModalContent>
        <ModalBody>
          {({ handleClose }) => (
            <Container align='left' size='xs' direction='column' gap='md' justify='center'>
              <FlexContainer direction='column' gap='sm'>
                <Heading3>Unfollow {parseUserName(targetUserName)}?</Heading3>
                <Paragraph color='textSecondary'>
                  Their posts will no longer show up in your For You timeline. You can still view
                  their profile, unless their posts are protected.
                </Paragraph>
              </FlexContainer>

              <FlexContainer direction='column' gap='sm'>
                <StyledButton variant='filled' onClick={handleClose(handleUnfollowButton)}>
                  <Heading4>Unfollow</Heading4>
                </StyledButton>

                <StyledButton variant='outline' onClick={handleClose()}>
                  <Heading4>Cancel</Heading4>
                </StyledButton>
              </FlexContainer>
            </Container>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export const FollowButton = withLoader(BaseFollowButton);
