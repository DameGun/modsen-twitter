import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteTweetMutation } from '@/entities/tweet';
import { DeleteIcon } from '@/shared/assets/icons';
import { useQueryWithLoading } from '@/shared/lib/useQueryWithLoading';
import { withLoader } from '@/shared/lib/withLoader';
import type { ManualLoadingHandleProps } from '@/shared/types/loader';
import * as Components from '@/shared/ui';

type DeleteButtonProps = ManualLoadingHandleProps & {
  tweetId: string;
  withRedirect?: boolean;
};

function BaseDeleteTweet({ tweetId, handleLoading, withRedirect }: DeleteButtonProps) {
  const navigate = useNavigate();
  const [deleteTweet, { isLoading }] = useDeleteTweetMutation();
  useQueryWithLoading({ isLoading, handleLoading });

  const handleDelete = useCallback(async () => {
    await deleteTweet(tweetId);
    if (withRedirect) navigate(-1);
  }, [tweetId, withRedirect]);

  return (
    <Components.Modal>
      <Components.ModalButton>
        {({ handleOpen }) => (
          <Components.StyledButton $variant='icon' onClick={handleOpen()}>
            <Components.StyledIcon $size='xs'>
              <DeleteIcon title='Delete' />
            </Components.StyledIcon>
          </Components.StyledButton>
        )}
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
                <Components.Heading3>Delete tweet?</Components.Heading3>
                <Components.Paragraph $color='textSecondary'>
                  This can’t be undone and it will be removed from your profile, the timeline of any
                  accounts that follow you, and from search results.
                </Components.Paragraph>
              </Components.FlexContainer>
              <Components.FlexContainer $direction='column' $gap='sm'>
                <Components.StyledButton $variant='filled' onClick={handleClose(handleDelete)}>
                  <Components.Heading4>Delete</Components.Heading4>
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

export const DeleteTweet = withLoader(BaseDeleteTweet);
