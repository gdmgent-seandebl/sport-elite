import express, { Express } from "express";
import { registerRoutes } from "./Routes/index";
import { registerMiddleware } from "./Middleware/index";

const app: Express = express();

registerMiddleware(app);

registerRoutes(app);

export default app;
