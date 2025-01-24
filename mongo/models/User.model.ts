import mongoose, { Schema, Document, models, type Types } from "mongoose";

export interface IUser extends Document {
  fName: string;
  lName: string;
  email: string;
  password: string;
  photo: string;
  watchlist: number[];
  favorites: number[];
}

const UserSchema = new Schema<IUser>(
  {
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    photo: { type: String },
    watchlist: { type: [Number], required: true, default: [] },
    favorites: { type: [Number], required: true, default: [] },
  },
  { timestamps: true },
);

export const User = models.User || mongoose.model<IUser>("User", UserSchema);
