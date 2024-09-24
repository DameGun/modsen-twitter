import { CreateTweetForm } from '@/features/tweet';
import { PostIcon } from '@/shared/assets/icons';
import {
  Heading4,
  Modal,
  ModalBody,
  ModalButton,
  ModalContent,
  ModalHeader,
  StyledIcon,
} from '@/shared/ui';

import { CreateTweetButton, CreateTweetModalWrapper } from './styled';

export function CreateTweetModal() {
  return (
    <Modal>
      <ModalButton>
        {({ handleOpen }) => (
          <CreateTweetButton variant='filled' onClick={handleOpen()}>
            <StyledIcon>
              <PostIcon />
            </StyledIcon>
            <Heading4>Post</Heading4>
          </CreateTweetButton>
        )}
      </ModalButton>
      <ModalContent isMobileFullscreen>
        <ModalHeader />
        <ModalBody>
          <CreateTweetModalWrapper>
            <CreateTweetForm isLoaderFullScreen />
          </CreateTweetModalWrapper>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
