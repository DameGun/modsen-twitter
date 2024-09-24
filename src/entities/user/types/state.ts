import type { UserDoc } from '.';

type UserState = {
  currentUser?: UserDoc;
};

type UsersCacheState = {
  users: UserDoc[];
};

export type { UsersCacheState, UserState };
