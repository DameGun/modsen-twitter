type UserLogin = {
  email: string;
  password: string;
};

type UserCreate = {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  dateOfBirth: number;
};

export type { UserCreate, UserLogin };
