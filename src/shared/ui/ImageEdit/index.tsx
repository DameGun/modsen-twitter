import { ChangeEvent, useRef } from 'react';

import { PhotoIcon } from '@/shared/assets/icons';
import { IMAGE_TYPES_CONSTRAINT } from '@/shared/constants/image';
import { useAsyncWithLoading } from '@/shared/lib/useAsyncWithLoading';
import { useUploadImg } from '@/shared/lib/useUploadImg';
import { withLoader } from '@/shared/lib/withLoader';
import type { ManualLoadingHandleProps } from '@/shared/types/loader';
import type { FormatStyledProps } from '@/shared/types/styles';

import { StyledImageEditButtonWrapper, type StyledImageEditProps } from './styled';

import { StyledButton } from '../StyledButton';
import { StyledIcon, StyledIconProps } from '../StyledIcon';

type ImageEditProps = ManualLoadingHandleProps &
  FormatStyledProps<StyledImageEditProps> &
  FormatStyledProps<StyledIconProps> & {
    handleChange(url?: string): void;
  };

function BaseImageEdit({
  handleChange,
  absolute,
  handleLoading,
  handleError,
  size,
}: ImageEditProps) {
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
        <StyledButton $variant='icon' onClick={handleClick}>
          <StyledIcon $size={size}>
            <PhotoIcon title='Media' />
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

export const ImageEdit = withLoader(BaseImageEdit);
