import { Router } from "express";
import { createOrder, getOrders } from "./Order.controller";

const router = Router();
router.post("/orders", createOrder);
router.get("/orders", getOrders);

export default router;
