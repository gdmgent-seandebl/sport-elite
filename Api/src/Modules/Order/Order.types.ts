import { ObjectId } from "mongodb";
import { Document } from "mongoose";

export enum StatusType {
  Pending = "Pending",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

export type Order = Document & {
  _id?: string;
  userId: ObjectId;
  products: { productid: ObjectId; quantity: number }[];
  total: number;
  status: StatusType;
};
