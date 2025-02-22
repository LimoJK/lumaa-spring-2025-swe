import pool from '../db';
import bcrypt from 'bcrypt';

export interface User {
    id: number;
    email: string;
    password: string;
}

// export const getUserByEmail = async (email: string): Promise<User | null> => {
//     const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//     if (result.rows.length === 0) return null;
//     return result.rows[0];  
// };

// export const createUser = async (email: string, password: string): Promise<User> => {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const result = await pool.query(
//         'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
//         [email, hashedPassword]
//     );
//     return result.rows[0]; 
// };


export const createUser = async (email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
        [email, hashedPassword]
    );
    return result.rows[0];
};

export const getUserByEmail = async (email: string) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};