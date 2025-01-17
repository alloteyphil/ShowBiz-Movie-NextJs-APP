import mongoose, { Schema, Document, Model, type Types } from "mongoose";

export interface IComment extends Document {
  movieId: number;
  comment: string;
  user: Types.ObjectId;
}

const CommentSchema: Schema = new Schema({
  movieId: { type: Number, required: true },
  comment: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

export const Comment = mongoose.model<IComment>("Comment", CommentSchema);
