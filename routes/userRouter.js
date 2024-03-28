import { Router } from 'express';
import {
    createUser,
    deleteUserWithId,
    getUserWithId,
    getUsers,
    updateUser,
} from '../controllers/userController.js';
import { nameValidator, validating } from '../middlewares/userValidation.js';
import { checkUser } from '../middlewares/checkUser.js';

export const userRouter = Router();

userRouter
    .route('/')
    .get(getUsers)
    .post(nameValidator(), validating, createUser);
userRouter
    .route('/:id')
    .get(checkUser, getUserWithId)
    .put(nameValidator(), validating, checkUser, updateUser)
    .delete(checkUser, deleteUserWithId);
