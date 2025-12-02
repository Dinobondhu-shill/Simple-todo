import express, { Router } from 'express'
import { todoController } from './todo.controller';

const router = Router();

router.post('/', todoController.createTodo)
router.get('/', todoController.getTodos)
router.get('/:user_id', todoController.getTodoByUserId)
router.put('/:id', todoController.updateTodo)
router.delete('/:id', todoController.deleteTodo)

export const todoRoutes = router;