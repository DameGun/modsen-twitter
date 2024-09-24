import { avatarFallbackImg } from '@/assets/images';
import { useAsyncWithLoading } from '@/hooks/useAsyncWithLoading';
import { useUploadImg } from '@/hooks/useUploadImg';
import type { ImageProps } from '@/types/image';
import type { ManualLoadingHandleProps } from '@/types/loader';
import { withLoader } from '@/utils/withLoader';

import { StyledUserPhoto, UserPhotoWrapper, UserPhotoWrapperProps } from './styled';

import { ImageEditButton } from '../ImageEditButton';

type UserPhotoProps = UserPhotoWrapperProps & ImageProps & ManualLoadingHandleProps;

function BaseUserAvatar({
  url,
  size,
  isEditable,
  handleLoading,
  handleError,
  handleChange,
}: UserPhotoProps) {
  const { handleImageChange, selectedFile } = useUploadImg();
  const { call } = useAsyncWithLoading({
    call: handleImageChange,
    handleLoading,
    errorHandler: handleError,
    handleResult: handleChange,
  });

  return (
    <UserPhotoWrapper size={size}>
      {isEditable && <ImageEditButton handleImageChange={call} />}
      <StyledUserPhoto
        src={selectedFile || url || avatarFallbackImg}
        referrerPolicy='no-referrer'
      />
    </UserPhotoWrapper>
  );
}

export const UserAvatar = withLoader(BaseUserAvatar);
