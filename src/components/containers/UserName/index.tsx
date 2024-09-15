import { Paragraph } from '@/components/ui';

type UserNameProps = {
  userName: string;
};

export function UserName({ userName }: UserNameProps) {
  return (
    <Paragraph color='textSecondary' weight='semibold'>
      @{userName}
    </Paragraph>
  );
}
