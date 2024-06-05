import { Router } from "express";
import { getCurrentUser, addFavorite, removeFavorite } from "./User.controller";

const router = Router();
router.get("/users/current", getCurrentUser);
router.post("/favorites/:productId", addFavorite);
router.delete("/favorites/:productId", removeFavorite);

export default router;
