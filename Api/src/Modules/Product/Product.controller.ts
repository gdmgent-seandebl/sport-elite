import { NextFunction, Request, Response } from "express";
import ProductModel from "./Product.model";
import NotFoundError from "../../Middleware/error/NotFoudError";
import { AuthRequest } from "../../Middleware/auth/authMiddleware";

// Fetch alle producten (iedereen)
const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// Fetch product detail (iedereen)
const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Maak nieuw product aan (enkel sellers en admins)
const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    if (!user.seller && !user.admin) {
      throw new Error("Only sellers or admins can create products");
    }
    const product = new ProductModel({ ...req.body, sellerId: user.id });
    const result = await product.save();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// Update een product (enkel de seller die eigenaar is of admins)
const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const product = await ProductModel.findOneAndUpdate(
      {
        _id: id,
        ...(user.seller ? { sellerId: user.id } : {}),
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!product) {
      throw new NotFoundError("Product not found or not authorized");
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Delete een product (enkel de seller die eigenaar is of admins)
const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const product = await ProductModel.findOneAndDelete({
      _id: id,
      ...(user.seller ? { sellerId: user.id } : {}),
    });
    if (!product) {
      throw new NotFoundError("Product not found or not authorized");
    }
    res.json({});
  } catch (err) {
    next(err);
  }
};

export {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
