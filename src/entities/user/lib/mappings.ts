import { store } from '@/shared/store';

export function parseUserRegisterDate(timestamp: number | string) {
  return new Date(timestamp).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export const parseUserName = (userName: string) => `@${userName}`;

export const getCurrentUser = () => store.getState().user.currentUser!;
