import { UserBackgroundPhotoWrapper } from './styled';

type UserBackgroundPhotoProps = {
  photoUrl?: string;
};

export function UserBackgroundPhoto({ photoUrl }: UserBackgroundPhotoProps) {
  return (
    <UserBackgroundPhotoWrapper>
      <img src={photoUrl} />
    </UserBackgroundPhotoWrapper>
  );
}
