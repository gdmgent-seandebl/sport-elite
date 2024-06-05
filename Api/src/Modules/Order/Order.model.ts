import mongoose from "mongoose";
import validateModel from "../../Validation/validateModel";
import { StatusType, Order } from "./Order.types";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: StatusType,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("save", function (next) {
  validateModel(this);
  next();
});

const OrderModel = mongoose.model<Order>("Order", orderSchema);

export default OrderModel;
