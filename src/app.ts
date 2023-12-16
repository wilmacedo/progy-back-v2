import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { errorHandler } from './utils/error-handler';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(express.json({ limit: '5mb' }));
app.use(morgan('dev'));

app.use(errorHandler);
