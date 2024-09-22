import type { ImageProps } from '@/types/image';

import { UserBackgroundPhotoWrapper } from './styled';

type UserBackgroundPhotoProps = ImageProps;

export function UserBackgroundImage({ url, children }: UserBackgroundPhotoProps) {
  return (
    <UserBackgroundPhotoWrapper>
      {children}
      {url && <img src={url} />}
    </UserBackgroundPhotoWrapper>
  );
}
