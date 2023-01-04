export interface IUser {
  uid: string; // unique id for logged user
  email: string;
  fullname: string; // fullname of the user
  isAuth?: boolean; // user is authenticate flag
  avatar?: string;
}
