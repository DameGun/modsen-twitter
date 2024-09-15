type UserCreate = {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  dateOfBirth: number;
};

type UserLogin = {
  email: string;
  password: string;
};

type UserDoc = {
  email: string;
  bio?: string;
  fullName: string;
  avatarUrl?: string;
  backgroundImageUrl?: string;
  dateOfBirth?: number;
  uid: string;
  userName: string;
  createdAt: number | string;
};

type UserState = {
  currentUser?: UserDoc;
};

type EditUser = Pick<
  UserDoc,
  'avatarUrl' | 'bio' | 'backgroundImageUrl' | 'fullName' | 'dateOfBirth'
>;

type UpdateUserProps = {
  uid: string;
  userObj: Partial<EditUser>;
};

export type { EditUser, UpdateUserProps, UserCreate, UserDoc, UserLogin, UserState };
