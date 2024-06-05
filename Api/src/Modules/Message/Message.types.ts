import { ObjectId } from "mongodb";
import { Document } from "mongoose";

export type Message = Document & {
  _id?: string;
  senderId: ObjectId;
  receiverId: ObjectId;
  productId: ObjectId;
  content: string;
  read: boolean;
};
