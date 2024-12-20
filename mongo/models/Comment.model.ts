import mongoose, { Schema, Document, Model } from "mongoose";

export interface IComment extends Document {
  movieId: number;
  comment: string;
  user: any;
}
