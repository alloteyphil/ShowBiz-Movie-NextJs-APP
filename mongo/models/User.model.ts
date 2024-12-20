import mongoose, { Schema, Document, models } from "mongoose";

export interface IUser extends Document {
  fName: string;
  lName: string;
  email: string;
  password: string;
  photo: string;
}

const UserSchema = new Schema<IUser>(
  {
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    photo: { type: String },
  },
  { timestamps: true }
);

UserSchema.set("toJSON", {
  transform: (doc: any, ret: any) => {
    delete ret.password;
    return ret;
  },
});

UserSchema.set("toObject", {
  transform: (doc: any, ret: any) => {
    delete ret.password;
    return ret;
  },
});

export const User = models.User || mongoose.model<IUser>("User", UserSchema);
