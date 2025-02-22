import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { createUser, getUserByEmail } from '../models/authModel';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET as string;

if (!SECRET_KEY) {
    throw new Error('Missing JWT_SECRET in environment variables');
}

export const register = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            res.status(400).json({ error: 'User already exists' });
            return;
        }

        const user = await createUser(email, password);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Registration failed' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const user = await getUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Login failed' });
    }
};

