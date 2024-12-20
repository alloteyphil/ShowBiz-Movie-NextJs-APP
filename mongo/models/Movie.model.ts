import mongoose, { Schema, Document } from "mongoose";

export interface IMovie extends Document {
  movieId: number;
  comments: string[];
}
