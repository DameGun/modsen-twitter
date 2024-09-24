import type { ImageProps } from '@/shared/types/image';

import { UserBackgroundPhotoWrapper } from './styled';

export function BackgroundImage({ url, children }: ImageProps) {
  return (
    <UserBackgroundPhotoWrapper>
      {children}
      {url && <img src={url} />}
    </UserBackgroundPhotoWrapper>
  );
}
