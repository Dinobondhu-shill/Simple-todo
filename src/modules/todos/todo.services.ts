import { pool } from "../../config/db";

const createTodo = async (payload: Record<string, unknown>) =>{
    const {title, description, user_id } = payload
    const result = await pool.query(`
              INSERT INTO todos(title, description, user_id) VALUES ($1, $2, $3) RETURNING *`, [title, description, user_id]);
        return result ;
}

const getTodos = async () => {
    const result = await pool.query(`
        SELECT * FROM todos
    `);
    return result;
};

const getTodoByUserId = async(user_id : string)=>{
    const result =  await pool.query(`
            SELECT * FROM todos WHERE user_id=$1
            `, [user_id])
        return result;
}

const updateTodo = async (payload : Record<string, unknown>, id:string) =>{
     const {title, description, isCompleted} = payload
     
    const result =  await pool.query(`
            UPDATE todos SET title= $1, description=$2, isCompleted=$3 WHERE id=$4 RETURNING *`, [
                title, description, isCompleted, id
            ])
            return result; 
}

const deleteTodo = async (id:string) =>{
    const result = await pool.query(`
            DELETE FROM todos WHERE id=$1 RETURNING *`,[id]);
            return result ;
}
export const todoServices = {
    createTodo,
    getTodos,
    getTodoByUserId,
    updateTodo, 
    deleteTodo
}