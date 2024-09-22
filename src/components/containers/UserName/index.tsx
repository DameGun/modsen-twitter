import { Paragraph } from '@/components/ui';
import { parseUserName } from '@/utils/user';

type UserNameProps = {
  userName: string;
};

export function UserName({ userName }: UserNameProps) {
  return <Paragraph color='textSecondary'>{parseUserName(userName)}</Paragraph>;
}
