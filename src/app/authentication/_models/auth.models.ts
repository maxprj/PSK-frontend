import {UserRole} from "../../users/_models/user";

export interface PasswordForm {
    password: string;
    token: string;
}

export interface CurrentUserView {
  id: string;
  email: string;
  name: string;
  surname: string;
  role: UserRole;
}
