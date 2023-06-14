import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRole extends Document {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export type RoleModel = Model<IRole>;

const RoleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "roles",
  }
);

const Role = mongoose.model<IRole, RoleModel>("Role", RoleSchema);

export default Role;
