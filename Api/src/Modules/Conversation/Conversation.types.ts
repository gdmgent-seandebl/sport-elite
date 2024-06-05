import { ObjectId } from "mongodb";
import { Document } from "mongoose";

export type Conversation = Document & {
  _id?: string;
  members: ObjectId[];
  messages: ObjectId[];
};
