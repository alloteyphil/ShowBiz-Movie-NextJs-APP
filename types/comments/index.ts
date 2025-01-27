export interface CommentInputType {
  movieId: number;
  comment: string;
  user: string;
}

type UserInfo = {
  id: string;
  fName: string;
  lName: string;
  photo: string | null;
};

export interface CommentResponseType {
  movieId: number;
  comment: string;
  user: UserInfo;
  createdAt: Date;
}
