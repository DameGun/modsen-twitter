import { ConnectionType } from '@/constants/user';

export function parseUserRegisterDate(timestamp: number | string) {
  return new Date(timestamp).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export const parseUserName = (userName: string) => `@${userName}`;

export const reverseMapConnectionType = (value: ConnectionType) => {
  return (value[0].toUpperCase() + value.slice(1)) as keyof typeof ConnectionType;
};
