export type UserType = {
  id: string;
  role: string | null;
  name: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type LoginUserType = {
  email: string;
  password: string;
};

export type SignUpUserType = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUserType = {
  id: string;
  name?: string;
  newPassword?: string;
  oldPassword?: string;
};

export type UsersType = Array<UserType>;
