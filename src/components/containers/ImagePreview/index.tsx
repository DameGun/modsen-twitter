import { CloseIcon } from '@/assets/icons';
import { StyledButton, StyledIcon } from '@/components/ui';

import { ImagePreviewWrapper } from './styled';

type ImagePreviewProps = {
  id: number;
  url: string;
  handleDelete(id: number): void;
};

export function ImagePreview({ id, url, handleDelete }: ImagePreviewProps) {
  const handleClick = () => handleDelete(id);

  return (
    <ImagePreviewWrapper>
      <StyledButton variant='icon' onClick={handleClick}>
        <StyledIcon $size='xs'>
          <CloseIcon />
        </StyledIcon>
      </StyledButton>
      <img src={url} />
    </ImagePreviewWrapper>
  );
}
