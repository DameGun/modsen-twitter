import {
  Modal,
  ModalBody,
  ModalButton,
  ModalContent,
  ModalHeader,
  StyledButton,
} from '@/components/ui';

import { CreateTweetModalWrapper } from './styled';

import { CreateTweetForm } from '../CreateTweetForm';

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
