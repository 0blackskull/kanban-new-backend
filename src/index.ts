import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import MainRouter from "./routes";
import { db } from "./db";
import { logger } from "./middleware/logger";

const PORT = process.env.PORT || 3000;

async function start() {
  const app = express();

  await db.init();

  app.use(logger);

  app.use(
    cors({
      origin: "https://kanban-frontend-1.netlify.app/",
      credentials: true,
      exposedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "X-Auth-Token",
        "Set-Cookie",
      ],
    })
  );

  app.use(cookieParser());

  app.use(express.json());

  // app.use((req, res, next) => {
  //   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Allow requests from frontend
  //   res.setHeader(
  //     "Access-Control-Allow-Methods",
  //     "GET, POST, PUT, DELETE, OPTIONS"
  //   );
  //   res.setHeader(
  //     "Access-Control-Allow-Headers",
  //     "Content-Type, Authorization"
  //   );
  //   res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow cookies
  //   next();
  // });

  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use("/", MainRouter);

  app.listen(PORT, () => {
    console.info(`Sprint starts on port ${PORT}`);
  });
}

start();
