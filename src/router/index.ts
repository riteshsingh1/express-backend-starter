import { Router } from "express";
import { initializeExampleRoutes } from "./example.router";

const router = Router();

export const initializeRoutes = () => {
  router.use("/", initializeExampleRoutes());
  return router;
};

export default router;
