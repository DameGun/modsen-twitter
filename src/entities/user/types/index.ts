import { ConnectionType } from '@/shared/constants/user';
import type { FirestoreObj } from '@/shared/types/firestore';

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

type UserState = {
  currentUser?: UserDoc;
};

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

type UserDoc = FirestoreObj & {
  email: string;
  bio?: string;
  fullName: string;
  avatarUrl?: string;
  backgroundImageUrl?: string;
  dateOfBirth?: number;
  userName: string;
  createdAt: number | string;
  followers: string[];
  following: string[];
};

type EditUser = Pick<
  UserDoc,
  'avatarUrl' | 'bio' | 'backgroundImageUrl' | 'fullName' | 'dateOfBirth'
>;

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
