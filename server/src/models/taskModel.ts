import pool from '../db';

export interface Task {
    id?: number;
    description: string;
    completed?: boolean;
    created_at?: Date;
}

export const getAllTasks = async (userId: number) => {
    const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    return result.rows;
};


export const getTaskById = async (id: number) => {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0];
};

export const createTask = async (description: string, userId:number) => {
    const result = await pool.query(
       'INSERT INTO tasks (description, completed, user_id) VALUES ($1, $2, $3) RETURNING *',
        [description, false, userId]
    );
    return result.rows[0];
};

export const updateTask = async (id: number, userId: number, description?: string, completed?: boolean) => {
    const result = await pool.query(
        'UPDATE tasks SET description = COALESCE($1, description), completed = COALESCE($2, completed) WHERE id = $3 AND user_id = $4 RETURNING *',
        [description, completed, id, userId] 
    );
    return result.rows[0];
};


export const deleteTask = async (id: number, userId: number) => {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
    return result.rows[0]; 
};
