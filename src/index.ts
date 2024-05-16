import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import MainRouter from './routes';
import { db } from './db';
import { logger } from './middleware/logger';

const PORT = process.env.PORT || 3000;

async function start() {

  const app = express();

  await db.init();

  app.use(logger)

  app.use(cors({ origin: 'http://localhost:5173' }));

  app.use(cookieParser());

  app.use(express.json());

  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use('/', MainRouter);

  app.listen(PORT, () => {
    console.info(`Sprint starts on port ${PORT}`);
  })
}

start();

