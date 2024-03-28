import express from 'express';
import { userRouter } from './routes/userRouter.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRouter);

app.use(errorHandler);

export default app;
