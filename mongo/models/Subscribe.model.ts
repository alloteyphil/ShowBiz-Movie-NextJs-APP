import mongoose, { Schema, Document, models } from "mongoose";

export interface ISubscribe extends Document {
  email: string;
  fName: string;
  lName: string;
}

const SubscribeSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    fName: { type: String, required: true },
    lName: { type: String, required: true },
  },
  { timestamps: true }
);

export const SubscribeInfo =
  models.Subscriber ||
  mongoose.model<ISubscribe>("Subscriber", SubscribeSchema);
