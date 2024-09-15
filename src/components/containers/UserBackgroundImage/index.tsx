import { useAsyncWithLoading } from '@/hooks/useAsyncWithLoading';
import { useUploadImg } from '@/hooks/useUploadImg';
import type { ImageProps } from '@/types/image';
import type { ManualLoadingHandleProps } from '@/types/loader';
import { withLoader } from '@/utils/withLoader';

import { UserBackgroundPhotoWrapper } from './styled';

import { ImageEditButton } from '../ImageEditButton';

type UserBackgroundPhotoProps = ImageProps & ManualLoadingHandleProps;

function BaseUserBackgroundImage({
  url,
  isEditable,
  handleError,
  handleLoading,
  handleChange,
}: UserBackgroundPhotoProps) {
  const { handleImageChange, selectedFile } = useUploadImg();
  const { call } = useAsyncWithLoading({
    call: handleImageChange,
    handleLoading,
    errorHandler: handleError,
    handleResult: handleChange,
  });

  return (
    <UserBackgroundPhotoWrapper>
      {isEditable && <ImageEditButton handleImageChange={call} />}
      {(selectedFile || url) && <img src={selectedFile || url} />}
    </UserBackgroundPhotoWrapper>
  );
}

export const UserBackgroundImage = withLoader(BaseUserBackgroundImage);
