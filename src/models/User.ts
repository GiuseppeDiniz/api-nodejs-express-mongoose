import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  login: string;
  password: string;
  email: string;
  refreshToken?: string;
  roles: string[];
}

export type UserModel = Model<IUser>;

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
    roles: [{ type: Schema.Types.ObjectId, ref: "Role" }], // Reference to the "Role" model
  },
  {
    timestamps: true,
    collection: "users",
  }
);

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export default User;
