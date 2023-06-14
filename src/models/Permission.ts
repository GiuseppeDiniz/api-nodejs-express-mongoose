import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPermission extends Document {
  name: string;
  description: string;
}

export type PermissionModel = Model<IPermission>;

const permissionSchema = new Schema<IPermission, PermissionModel>(
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
    collection: "permissions",
  }
);

const Permission = mongoose.model<IPermission, PermissionModel>(
  "Permission",
  permissionSchema
);

export default Permission;
