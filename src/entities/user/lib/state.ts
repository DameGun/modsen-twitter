import { store } from '@/shared/store';

export const getCurrentUser = () => store.getState().user.currentUser!;
