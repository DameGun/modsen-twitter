import { ConnectionType } from '@/constants/user';

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
  followers: string[];
  following: string[];
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

type UserConnectionsProps = {
  userName: string;
  connectionType: ConnectionType;
};

type UserSubcriptionProps = {
  targetUid: string;
  uid: string;
  previousFollowing: string[];
};

export type {
  EditUser,
  UpdateUserProps,
  UserConnectionsProps,
  UserCreate,
  UserDoc,
  UserLogin,
  UserState,
  UserSubcriptionProps,
};
