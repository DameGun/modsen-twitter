import { ChangeEvent, useRef } from 'react';

import { PhotoIcon } from '@/shared/assets/icons';
import { IMAGE_TYPES_CONSTRAINT } from '@/shared/constants/image';
import { useAsyncWithLoading } from '@/shared/lib/useAsyncWithLoading';
import { useUploadImg } from '@/shared/lib/useUploadImg';
import { withLoader } from '@/shared/lib/withLoader';
import type { ManualLoadingHandleProps } from '@/shared/types/loader';
import type { FormatStyledProps } from '@/shared/types/styles';
import { StyledButton, StyledIcon } from '@/shared/ui';
import { StyledIconProps } from '@/shared/ui/StyledIcon';

import { StyledImageEditButtonProps, StyledImageEditButtonWrapper } from './styled';

type ImageEditButtonProps = ManualLoadingHandleProps &
  FormatStyledProps<StyledImageEditButtonProps> &
  FormatStyledProps<StyledIconProps> & {
    handleChange(url?: string): void;
  };

function BaseImageEditButton({
  handleChange,
  absolute,
  handleLoading,
  handleError,
  size,
}: ImageEditButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleImageChange } = useUploadImg();
  const { call } = useAsyncWithLoading({
    call: handleImageChange,
    handleLoading,
    errorHandler: handleError,
    handleResult: handleChange,
  });

  const handleClick = () => inputRef.current && inputRef.current.click();

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await call(file);
      } catch (err) {
        handleError?.(err);
      }
    }
  };

  return (
    <StyledImageEditButtonWrapper $absolute={absolute}>
      <span>
        <StyledButton variant='icon' onClick={handleClick}>
          <StyledIcon $size={size}>
            <PhotoIcon />
          </StyledIcon>
        </StyledButton>
        <input
          type='file'
          hidden
          ref={inputRef}
          onChange={handleFileUpload}
          accept={IMAGE_TYPES_CONSTRAINT}
        />
      </span>
    </StyledImageEditButtonWrapper>
  );
}

export const ImageEditButton = withLoader(BaseImageEditButton);
