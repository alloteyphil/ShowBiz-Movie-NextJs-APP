import mongoose, { Schema, Document, models, type Types } from "mongoose";

export interface IMovie extends Document {
  movieId: number;
  title: string;
  genres: { id: number; name: string }[];
  photo: string;
  comments: Types.ObjectId[];
  type: string;
}

const MovieSchema: Schema = new Schema({
  movieId: { type: Number, required: true },
  title: { type: String, required: true },
  genres: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
    },
  ],
  photo: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, required: false }],
  type: { type: String, required: true },
});

export const Movie =
  models.Movie || mongoose.model<IMovie>("Movie", MovieSchema);
