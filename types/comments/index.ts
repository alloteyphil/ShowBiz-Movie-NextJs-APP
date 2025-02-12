import type { ObjectId } from "mongoose";

export interface GetAllMovieCommentsResponseType {
  id: string;
  commentText: string;
}
export interface CommentInputType {
  movieId: number;
  comment: string;
  user: string;
}

export interface CommentType {
  id: string;
  movieId: number;
  comment: string;
  user: {
    id: string;
    fName: string;
    lName: string;
    photo: string | null;
  };
  likes: number;
  createdAt: string;
}

export interface AddCommentResponseType {
  statusCode: number;
  message: string;
  response: {
    movieId: number;
    comments: {
      id: string;
      commentText: string;
    }[];
  } | null;
}
