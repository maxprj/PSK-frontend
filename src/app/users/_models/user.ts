export interface UpdateUserForm {
  name: string;
  surname: string;
  role: string;
}

export interface NewUserForm {
  name: string;
  surname: string;
  email: string;
  role: string;
}

export interface UserView {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserListView {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  createdAt: Date;
  status: string;
}

export interface UserAllView {
  id: string;
  name: string;
  surname: string;
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  VERIFICATION_PENDING = 'VERIFICATION_PENDING'
}

export enum UserRole {
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_USER = "ROLE_USER",
  ROLE_ORGANIZER = "ROLE_ORGANIZER"
}
