import { Request, Response } from 'express';
import { getAllTasks, getTaskById, createTask, updateTask, deleteTask } from '../models/taskModel';

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user?.userId; 

    if (!userId) {
         res.status(401).json({ error: 'Unauthorized' });
         return;
    }

    try {
        const tasks = await getAllTasks(userId); 
        console.log("Received task description:", tasks);
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};

export const getTask = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const task = await getTaskById(Number(id)); 
        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving task' });
    }
};


export const addTask = async (req: Request, res: Response): Promise<void> => {
    const { description } = req.body;
    const userId = (req as any).user?.userId;

    if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        console.log("Received task description:", description);
        const newTask = await createTask(description, userId);
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Database Insert Error:", error);
        res.status(500).json({ error: 'Error adding task' });
    }
};

export const editTask = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { description, completed } = req.body;
    const userId = (req as any).user?.userId;

    if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const updatedTask = await updateTask(Number(id), userId, description, completed);
        if (!updatedTask) {
            res.status(403).json({ error: 'Unauthorized or task not found' });
        }
        res.json(updatedTask);
        console.log(updateTask)
    } catch (error) {
        console.log("Update error", error)
        res.status(500).json({ error: 'Error updating task' });
    }
};

export const removeTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = (req as any).user?.userId;

    if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const deletedTask = await deleteTask(Number(id), userId);
        if (!deletedTask) {
            res.status(403).json({ error: 'Unauthorized or task not found' });
        }
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting task' });
    }
};
