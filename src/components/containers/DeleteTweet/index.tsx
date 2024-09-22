import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { DeleteIcon } from '@/assets/icons';
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
  StyledIcon,
} from '@/components/ui';
import { useQueryWithLoading } from '@/hooks/useQueryWithLoading';
import { useDeleteTweetMutation } from '@/services/store/tweets/deleteTweet';
import type { ManualLoadingHandleProps } from '@/types/loader';
import { withLoader } from '@/utils/withLoader';

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
    <Modal>
      <ModalButton>
        {({ handleOpen }) => (
          <StyledButton variant='icon' onClick={handleOpen()}>
            <StyledIcon $size='xs'>
              <DeleteIcon />
            </StyledIcon>
          </StyledButton>
        )}
      </ModalButton>
      <ModalContent>
        <ModalBody>
          {({ handleClose }) => (
            <Container align='left' size='xs' direction='column' gap='md' justify='center'>
              <FlexContainer direction='column' gap='sm'>
                <Heading3>Delete tweet?</Heading3>
                <Paragraph color='textSecondary'>
                  This can’t be undone and it will be removed from your profile, the timeline of any
                  accounts that follow you, and from search results.
                </Paragraph>
              </FlexContainer>
              <FlexContainer direction='column' gap='sm'>
                <StyledButton variant='filled' onClick={handleClose(handleDelete)}>
                  <Heading4>Delete</Heading4>
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

export const DeleteTweet = withLoader(BaseDeleteTweet);
