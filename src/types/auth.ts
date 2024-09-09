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

export type { UserCreate, UserLogin };
