type UserCreate = {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
};

type UserLogin = {
  email: string;
  password: string;
};

type UserDoc = {
  email: string;
  fullName: string;
  photoUrl?: string;
  dateOfBirth?: number;
  uid: string;
  userName: string;
  createdAt: number | string;
};

type UserState = {
  currentUser?: UserDoc;
};

export type { UserCreate, UserDoc, UserLogin, UserState };
