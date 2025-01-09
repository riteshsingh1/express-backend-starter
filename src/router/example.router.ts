import { exampleController } from "@/controllers/example.controller";
import { parseHeaders } from "@/middlewares";
import { Router } from "express";

// Create the router without immediate configuration
const router = Router();

// Defer the route configuration until after env is initialized
export const initializeExampleRoutes = () => {
  console.log("Initializing example routes");
  // Attach the route to the router
  router.get("/hello", parseHeaders, exampleController.hello);
  // Return the router
  return router;
};
