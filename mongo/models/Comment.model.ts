import mongoose, { Schema, Document, type Types, Model } from "mongoose";

export interface IComment extends Document {
  movieId: number;
  comment: string;
  user: Types.ObjectId;
  likes: string[];
}

const CommentSchema: Schema = new Schema(
  {
    movieId: { type: Number, required: true },
    comment: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likes: { type: [String], default: [] },
  },
  {
    timestamps: true,
  },
);

const Comment: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
