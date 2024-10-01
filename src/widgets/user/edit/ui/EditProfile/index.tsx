import { useRef } from 'react';

import * as Components from '@/shared/ui';

import { EditProfileForm } from '../EditProfileForm';

export function EditProfile() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  return (
    <Components.Modal>
      <Components.ModalButton>
        {({ handleOpen }) => (
          <Components.StyledButton $variant='outline' onClick={handleOpen()}>
            <Components.Paragraph $weight='semibold'>Edit profile</Components.Paragraph>
          </Components.StyledButton>
        )}
      </Components.ModalButton>
      <Components.ModalContent isMobileFullscreen>
        <Components.ModalHeader showSubmitButton handleSubmit={handleSubmit}>
          <Components.Heading3>Edit profile</Components.Heading3>
        </Components.ModalHeader>
        <Components.ModalBody>
          <EditProfileForm ref={formRef} isLoaderFullScreen />
        </Components.ModalBody>
      </Components.ModalContent>
    </Components.Modal>
  );
}
