import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { prisma } from './lib/prisma';
import { errorHandler } from './utils/error-handler';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(express.json({ limit: '5mb' }));
app.use(morgan('dev'));

app.use('/users', async (_, res) => {
  const users = await prisma.user.findMany();

  res.status(200).json({ users });
});

app.use(errorHandler);
