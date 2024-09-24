import { CreateTweetForm } from '@/features/tweet';
import {
  Modal,
  ModalBody,
  ModalButton,
  ModalContent,
  ModalHeader,
  StyledButton,
} from '@/shared/ui';

import { CreateTweetModalWrapper } from './styled';

export function CreateTweetModal() {
  return (
    <Modal>
      <ModalButton>
        {({ handleOpen }) => (
          <StyledButton variant='filled' onClick={handleOpen()}>
            Post
          </StyledButton>
        )}
      </ModalButton>
      <ModalContent>
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
