import { ChangeEvent, useRef } from 'react';

import { PhotoIcon } from '@/assets/icons';
import { StyledButton, StyledIcon } from '@/components/ui';
import { IMAGE_TYPES_CONSTRAINT } from '@/constants/image';

import { StyledImageEditButtonWrapper } from './styled';

type ImageEditButtonProps = {
  handleImageChange(file?: File): Promise<string | undefined>;
};

export function ImageEditButton({ handleImageChange }: ImageEditButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => inputRef.current && inputRef.current.click();

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await handleImageChange(file);
  };

  return (
    <StyledImageEditButtonWrapper>
      <span>
        <StyledButton variant='icon' onClick={handleClick}>
          <StyledIcon>
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
