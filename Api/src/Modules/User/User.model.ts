import { Document } from "mongodb";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "./User.types";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    seller: {
      type: Boolean,
      default: false,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Product",
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Order",
      },
    ],
    refreshToken: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user: Document = this;

  if (!user.isModified("password")) {
    return next();
  }

  try {
    bcrypt.hash(user.password, 10, function (err: Error | null, hash: string) {
      if (err) {
        throw err;
      }
      user.password = hash;
      return next();
    });
  } catch (err: any) {
    return next(err);
  }
});

userSchema.methods = {
  comparePassword: function (password: string) {
    const user = this;
    return new Promise((resolve, reject) => {
      bcrypt.compare(
        password,
        user.password,
        (err: Error | null, isMatch: boolean) => {
          if (isMatch) {
            resolve(true);
          } else {
            reject(err);
          }
        }
      );
    });
  },
  generateToken: function () {
    const user = this;
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET ?? "", {
      expiresIn: 60 * 120,
    });
  },
  generateRefreshToken: function () {
    const user = this;
    return jwt.sign({ _id: user._id }, process.env.JWT_REFRESH_SECRET ?? "", {
      expiresIn: "7d",
    });
  },
};

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
  },
});

userSchema.set("toObject", {
  transform: function (doc, ret) {
    delete ret.password;
  },
});

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
