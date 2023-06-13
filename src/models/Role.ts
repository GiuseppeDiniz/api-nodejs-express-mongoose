import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

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

const Role = mongoose.model<IRole>("Role", RoleSchema);

export default Role;
