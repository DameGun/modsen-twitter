import { SyntheticEvent } from 'react';

import { avatarFallbackImg } from '@/assets/images';
import type { ImageProps } from '@/types/image';

import { StyledUserPhoto, UserPhotoWrapper, UserPhotoWrapperProps } from './styled';

type UserPhotoProps = UserPhotoWrapperProps & ImageProps;

export function UserAvatar({ url, size, children }: UserPhotoProps) {
  const handleImageError = ({ currentTarget }: SyntheticEvent<HTMLImageElement, Event>) => {
    currentTarget.onerror = null;
    currentTarget.src = avatarFallbackImg;
  };

  return (
    <UserPhotoWrapper size={size}>
      {children}
      <StyledUserPhoto
        src={url || avatarFallbackImg}
        onError={handleImageError}
        referrerPolicy='no-referrer'
      />
    </UserPhotoWrapper>
  );
}
