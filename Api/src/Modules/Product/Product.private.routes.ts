import { Router } from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "./Product.controller";

const router = Router();
router.post("/products", createProduct);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
