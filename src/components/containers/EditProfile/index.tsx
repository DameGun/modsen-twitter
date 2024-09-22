import { useRef } from 'react';

import {
  Heading3,
  Modal,
  ModalBody,
  ModalButton,
  ModalContent,
  ModalHeader,
  Paragraph,
  StyledButton,
} from '@/components/ui';

import { EditProfileForm } from '../EditProfileForm';

export function EditProfile() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  return (
    <Modal>
      <ModalButton>
        {({ handleOpen }) => (
          <StyledButton variant='outline' onClick={handleOpen()}>
            <Paragraph weight='semibold'>Edit profile</Paragraph>
          </StyledButton>
        )}
      </ModalButton>
      <ModalContent>
        <ModalHeader showSubmitButton handleSubmit={handleSubmit}>
          <Heading3>Edit profile</Heading3>
        </ModalHeader>
        <ModalBody>
          <EditProfileForm ref={formRef} isLoaderFullScreen />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
