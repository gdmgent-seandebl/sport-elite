export type Member = {
  _id: string;
  email: string;
  name: string;
};

export type Conversation = {
  _id: string;
  name: string;
  members: Member[];
  messages: string[];
  createdAt: Date;
  updatedAt: Date;
};
