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
