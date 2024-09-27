import { CloseIcon } from '@/shared/assets/icons';
import { StyledButton, StyledIcon } from '@/shared/ui';

import { ImagePreviewWrapper } from './styled';

type ImagePreviewProps = {
  id: number;
  url: string;
  handleDelete(id: number): void;
};

export function ImagePreview({ id, url, handleDelete }: ImagePreviewProps) {
  const handleClick = () => handleDelete(id);

  return (
    <ImagePreviewWrapper data-testid='tweet-image-preview'>
      <StyledButton $variant='icon' onClick={handleClick}>
        <StyledIcon $size='xs'>
          <CloseIcon title='Close' />
        </StyledIcon>
      </StyledButton>
      <img src={url} />
    </ImagePreviewWrapper>
  );
}
