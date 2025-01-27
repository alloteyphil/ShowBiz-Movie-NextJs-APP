import mongoose, { Schema, Document, type Types, Model } from "mongoose";

export interface IComment extends Document {
  movieId: number;
  comment: string;
  user:
    | Types.ObjectId
    | {
        _id: Types.ObjectId;
        fName: string;
        lName: string;
        photo?: string;
      };
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema = new Schema(
  {
    movieId: { type: Number, required: true },
    comment: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  },
);

const Comment: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
