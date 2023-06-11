import mongoose, { type Document, type Model, Schema } from "mongoose";

export type UserDocument = {
  login: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  refreshToken?: string;
} & Document;

export type UserModel = Record<string, unknown> & Model<UserDocument>;

const userSchema = new Schema<UserDocument, UserModel>(
  {
    login: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    refreshToken: {
      type: String,
    },
  },
  { collection: "users" }
);

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export default User;
