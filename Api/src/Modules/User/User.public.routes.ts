import { Router } from "express";
import { authLocal } from "../../Middleware/auth/authMiddleware";
import { login, refresh } from "./User.controller";
import { registerUser } from "./User.registration.controller";

const router = Router();
router.post("/login", authLocal, login);
router.post("/register", registerUser);
router.post("/refresh", refresh);

export default router;
