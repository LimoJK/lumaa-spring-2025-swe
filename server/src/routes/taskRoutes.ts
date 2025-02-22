import express from 'express';
import { getTasks, getTask, addTask, editTask, removeTask } from '../controllers/taskControllers';

const router = express.Router();

router.get('/tasks', getTasks);
router.get('/tasks/:id', getTask);
router.post('/tasks', addTask);
router.put('/tasks/:id', editTask);
router.delete('/tasks/:id', removeTask);

export default router;
