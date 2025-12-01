import { Request, Response, Router } from 'express';
import { pool } from '../../config/db';
import { userController } from './user.controller';

const router = Router();

// Create user
router.post('/', userController.createUser);

// Get all users
router.get('/', userController.getUser);

// get single user
router.get('/:id', userController.getSingleUser)

// users data update
router.put('/:id', userController.updateUser)

// user delete 
router.delete('/:id', userController.deleteUser)

export const userRoutes = router;
