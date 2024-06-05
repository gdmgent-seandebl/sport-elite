import { Express, Router } from "express";
import { errorHandler } from "../Middleware/error/errorHandlerMiddleware";
import userPublicRoutes from "../Modules/User/User.public.routes";
import userPrivateRoutes from "../Modules/User/User.private.routes";
import productPrivateRoutes from "../Modules/Product/Product.private.routes";
import productPublicRoutes from "../Modules/Product/Product.public.routes";
import orderRoutes from "../Modules/Order/Order.routes";
import messageRoutes from "../Modules/Message/Message.routes";
import conversationRoutes from "../Modules/Conversation/Conversation.routes";
import { authJwt } from "../Middleware/auth/authMiddleware";

const registerRoutes = (app: Express) => {
  // openbare routes
  app.use("/", userPublicRoutes);
  app.use("/", productPublicRoutes);

  // routes waar login voor nodig is
  const authRoutes = Router();
  authRoutes.use("/", userPrivateRoutes);
  authRoutes.use("/", productPrivateRoutes);
  authRoutes.use("/", orderRoutes);
  authRoutes.use("/", messageRoutes);
  authRoutes.use("/", conversationRoutes);

  app.use(authJwt, authRoutes);

  // plaat error middleware na alle andere routes
  app.use(errorHandler);
};

export { registerRoutes };
