import { Request, Response, NextFunction } from 'express';
import jwt,  { JwtPayload }  from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET as string;

if (!SECRET_KEY) {
    throw new Error('Missing JWT_SECRET in environment variables');
}

interface AuthenticatedRequest extends Request {
    user?: { userId: number }; 
}


const authenticateUser = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized' });
        return; 
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

        if (!decoded.userId) {
            res.status(401).json({ error: 'Invalid token payload' });
            return;
        }

        req.user = { userId: decoded.userId }; 
        next(); 
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

export default authenticateUser;