import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  login: string;
  password: string;
  email: string;
  refreshToken?: string;
}

const userSchema = new Schema<IUser>(
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

const User = mongoose.model<IUser>("User", userSchema);

export default User;
