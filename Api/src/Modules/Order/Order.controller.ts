import { Request, Response, NextFunction } from "express";
import OrderModel from "./Order.model";
import { AuthRequest } from "../../Middleware/auth/authMiddleware";
import ProductModel from "../Product/Product.model";
import NotFoundError from "../../Middleware/error/NotFoudError";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { products } = req.body;

    let total = 0;
    const orderProducts = await Promise.all(
      products.map(async (item: { productId: string; quantity: number }) => {
        const product = await ProductModel.findById(item.productId);
        if (!product) {
          throw new NotFoundError(
            `Product with ID ${item.productId} not found`
          );
        }
        total += product.price * item.quantity;
        return { productId: product.id, quantity: item.quantity };
      })
    );

    const order = new OrderModel({
      userId: user.id,
      products: orderProducts,
      total,
    });

    await order.save();

    user.orders.push(order.id);
    await user.save();

    res.json(order);
  } catch (err) {
    next(err);
  }
};

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const orders = await OrderModel.find({ userId: user.id }).populate(
      "products.productId"
    );
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export { createOrder, getOrders };
