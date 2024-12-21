export interface UserInputType {
  fName: string;
  lName: string;
  email: string;
  password: string;
  photo?: string;
}

export interface UserResponseType {
  fName: string;
  lName: string;
  email: string;
  photo?: string;
}

export interface UserLoginType {
  email: string;
  password: string;
}
