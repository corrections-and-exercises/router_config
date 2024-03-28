import express from 'express';
import { userRouter } from './routes/userRouter.js';
import { errorHandler } from './middlewares/errorHandler.js';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRouter);

app.use(errorHandler);

export default app;
