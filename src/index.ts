import "module-alias/register";

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import { checkApiKey } from "@/middlewares";
import { initializeRoutes } from "@/router";
import jobs from "@/jobs";
import { helpers } from "@/config/helpers";
import { env } from "@/config/env";
// configures dotenv to work in your application
const app = express();

(async () => {
  try {
    app.use(express.json({ limit: "200mb" }));
    app.use(helmet());
    app.use(helmet.hidePoweredBy());
    app.use(helmet.noSniff());
    app.use(helmet.xssFilter());
    app.use(helmet.frameguard({ action: "deny" }));
    app.use(
      helmet.hsts({ maxAge: 31536000, includeSubDomains: true, preload: true })
    );
    app.use(helmet.referrerPolicy({ policy: "same-origin" }));
    app.use(checkApiKey);
    helpers.log.info(
      helpers.formatMessage("BOOTING_UP", { message: "Starting question-ms" })
    );
    // connect to the database
    await mongoose.connect(env.MONGO_URI as string, {
      autoIndex: true,
      autoCreate: true,
    });

    helpers.log.info(
      helpers.formatMessage("DATABASE", { message: "Connected to database" })
    );
    jobs.startAllJobs();
    /**
     * ROUTE DEFINITIONS :: START :: ROUTE DEFINITIONS
     * Define the routes for your application here
     */
    app.use(`${env.BASE_PATH}`, initializeRoutes());
    // handle 404 errors
    app.use((req: Request, res: Response) => {
      res.status(404).json({
        errorCode: "NOT_FOUND",
        message: "The requested resource was not found",
      });
    });
    /**
     * ROUTE DEFINITIONS :: END :: ROUTE DEFINITIONS
     * Route definitions end here
     */
    app.listen(env.PORT, () => {
      helpers.log.info(`Server is running on port ${env.PORT}`);
    });
  } catch (err) {
    console.log(err);
    helpers.log.error(helpers.formatMessage("ERROR", { message: err }));
    process.exit(1);
  }
})();
