import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const createUser = async (payload: Record<string, unknown>) =>{
    const { name, email, password, age, phone } = payload;

    const hashedPassword = await bcrypt.hash(password as string, 10)

    const result = await pool.query(
      `INSERT INTO users(name, email, password, age, phone) VALUES($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, hashedPassword, age, phone]
    );
    return result;
}

const getUser = async () =>{
    const result = await pool.query(`SELECT * FROM users`)

    return result;
}

const getSingleUser = async(id : any) =>{
    const result = await  pool.query(`
            SELECT * FROM users WHERE id = ($1)
            `, [id]);

    return result;
}

const updateUser = async (payload: Record<string, unknown>, id:string) =>{
    const {name, phone, email } = payload
    const result =  pool.query(`
            UPDATE users SET name=$1, phone =$2, email=$3 WHERE id= $4 RETURNING *
            `, [name, phone, email,id])

            return result
}

const deleteUser = async(id : string) =>{
   const result =  await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]); 

   return result ;
}
export const userService = {
    createUser,
    getUser,
    getSingleUser,
    updateUser, 
    deleteUser

}