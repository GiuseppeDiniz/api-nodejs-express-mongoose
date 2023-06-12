import mongoose, { type Document, type Model, Schema } from "mongoose";

export type UserDocument = {
  login: string;
  password: string;
  email: string;
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
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export default User;
