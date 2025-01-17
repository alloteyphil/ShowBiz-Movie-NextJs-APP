import mongoose, { Schema, Document, type Types } from "mongoose";

export interface IMovie extends Document {
  movieId: number;
  comments: Types.ObjectId[];
}

const MovieSchema: Schema = new Schema({
  movieId: { type: Number, required: true },
  comments: { type: Array(Schema.Types.ObjectId), required: false },
});

export const Movie = mongoose.model<IMovie>("Movie", MovieSchema);
