import { avatarFallbackImg } from '@/assets/images';

import { UserPhotoWrapper, UserPhotoWrapperProps } from './styled';

type UserPhotoProps = UserPhotoWrapperProps & {
  photoUrl?: string;
};

export function UserPhoto({ photoUrl, size }: UserPhotoProps) {
  return (
    <UserPhotoWrapper
      src={photoUrl || avatarFallbackImg}
      size={size}
      referrerPolicy='no-referrer'
    />
  );
}
