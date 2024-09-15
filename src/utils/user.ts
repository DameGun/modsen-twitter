import { UserDoc } from '@/types/user';

export function parseUserRegisterDate(timestamp: number | string) {
  return new Date(timestamp).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export const mapUserWithDate = (user: UserDoc): UserDoc => ({
  ...user,
  createdAt: parseUserRegisterDate(user.createdAt),
});
