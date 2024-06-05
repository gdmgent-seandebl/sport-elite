import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthRequest } from "../../Middleware/auth/authMiddleware";
import ProductModel from "../Product/Product.model";
import NotFoundError from "../../Middleware/error/NotFoudError";
import UserModel from "./User.model";

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req as AuthRequest;
  const token = user.generateToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save();

  res.json({
    token,
    refreshToken,
  });
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  try {
    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET ?? ""
    ) as JwtPayload;

    if (typeof payload === "string" || !payload._id) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const user = await UserModel.findById(payload._id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const newToken = user.generateToken();
    const newRefreshToken = user.generateRefreshToken();
    user.refreshToken = newRefreshToken;
    await user.save();

    res.json({
      token: newToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};

const getCurrentUser = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req as AuthRequest;
  res.json(user);
};

const addFavorite = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { productId } = req.params;

    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new NotFoundError("Product not found");
    }

    user.favorites.push(product.id);
    await user.save();

    res.json(user.favorites);
  } catch (err) {
    next(err);
  }
};

const removeFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const { productId } = req.params;

    user.favorites = user.favorites.filter(
      (favProductId) => favProductId.toString() !== productId
    );
    await user.save();

    res.json(user.favorites);
  } catch (err) {
    next(err);
  }
};

export { login, refresh, getCurrentUser, addFavorite, removeFavorite };
