export interface IUser {
  uid: string;
  email: string;
  fullname: string;
  bio?: string;
  isAuth?: boolean;
  avatar?: string;
  occupation?: string;
}
