export type Message = {
  _id: string;
  senderId: {
    _id: string;
    name: string;
    email: string;
  };
  receiverId: {
    _id: string;
    name: string;
    email: string;
  };
  productId: string;
  content: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
};
