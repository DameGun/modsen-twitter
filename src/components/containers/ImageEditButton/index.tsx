import { ChangeEvent, useRef } from 'react';

import { PhotoIcon } from '@/assets/icons';
import { StyledButton, StyledIcon } from '@/components/ui';
import { StyledIconProps } from '@/components/ui/StyledIcon';
import { IMAGE_TYPES_CONSTRAINT } from '@/constants/image';
import { useAsyncWithLoading } from '@/hooks/useAsyncWithLoading';
import { useUploadImg } from '@/hooks/useUploadImg';
import type { ManualLoadingHandleProps } from '@/types/loader';
import type { FormatStyledProps } from '@/types/styles';
import { withLoader } from '@/utils/withLoader';

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
