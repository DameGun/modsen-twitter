import { Paragraph } from '@/shared/ui';

import { parseUserName } from '../../lib';

type UserNameProps = {
  userName: string;
};

export function UserName({ userName }: UserNameProps) {
  return <Paragraph color='textSecondary'>{parseUserName(userName)}</Paragraph>;
}
