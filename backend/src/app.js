import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';

import { env } from './config/env.js';
import { logger } from './config/logger.js';
import v1Router from './routes/v1/index.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestId } from './middleware/requestId.js';

const app = express();

app.set('trust proxy', 1);

app.use(requestId);

// ---------- Security ----------
app.use(helmet());
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

const limiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use(`/api/${env.apiVersion}`, limiter);

// ---------- Core middleware ----------
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser(env.cookieSecret));
app.use(compression());

if (env.nodeEnv !== 'test') {
  app.use(morgan('dev', { stream: { write: (msg) => logger.http?.(msg.trim()) || logger.info(msg.trim()) } }));
}

// ---------- Routes ----------
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the AI Placement Coach API',
    docs: `/api/${env.apiVersion}/health`,
  });
});

app.use(`/api/${env.apiVersion}`, v1Router);

// ---------- Error handling ----------
app.use(notFound);
app.use(errorHandler);

export default app;
