import mongoose, { Schema } from "mongoose";
import validateModel from "../../Validation/validateModel";
import {
  AgeType,
  BrandType,
  WeightType,
  GripType,
  Product,
} from "./Product.types";

const productSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    price: {
      type: Number,
      required: true,
    },
    age: {
      type: String,
      enum: AgeType,
      required: true,
    },
    brand: {
      type: String,
      enum: BrandType,
      required: true,
    },
    grip: {
      type: String,
      enum: GripType,
      required: true,
    },
    weight: {
      type: String,
      enum: WeightType,
      required: true,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", function (next) {
  validateModel(this);
  next();
});

const ProductModel = mongoose.model<Product>("Product", productSchema);

export default ProductModel;
