import { CreateTweetForm } from '@/features/tweet';
import { PostIcon } from '@/shared/assets/icons';
import * as Components from '@/shared/ui';

import { CreateTweetButton, CreateTweetModalWrapper } from './styled';

export function CreateTweetModal() {
  return (
    <Components.Modal>
      <Components.ModalButton>
        {({ handleOpen }) => (
          <CreateTweetButton data-testid='create-post' $variant='filled' onClick={handleOpen()}>
            <Components.StyledIcon>
              <PostIcon title='Post' />
            </Components.StyledIcon>
            <Components.Heading4>Post</Components.Heading4>
          </CreateTweetButton>
        )}
      </Components.ModalButton>
      <Components.ModalContent isMobileFullscreen>
        <Components.ModalHeader />
        <Components.ModalBody>
          <CreateTweetModalWrapper data-testid='create-post-modal'>
            <CreateTweetForm isLoaderFullScreen />
          </CreateTweetModalWrapper>
        </Components.ModalBody>
      </Components.ModalContent>
    </Components.Modal>
  );
}
