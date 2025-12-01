import express, { Request, Response } from 'express';
import {Pool} from "pg"
import dotenv from "dotenv"
import path from "path";

dotenv.config({path : path.join(process.cwd(), ".env")});
const app = express();
const port = 5000;
app.use(express.json());


// DB
const pool = new Pool({
    connectionString: `${process.env.CONNECTION_STR}`
})

const initDB = async()=>{
   await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email  VARCHAR(100) NOT NULL UNIQUE,
            age INT,
            phone VARCHAR(15) UNIQUE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
        `);
      await  pool.query(`
            CREATE TABLE IF NOT EXISTS todos(
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(200) NOT NULL,
            description TEXT,
            isCompleted BOOLEAN DEFAULT false,
            date DATE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            `)
}

initDB();


app.get('/', (req :Request, res : Response)=> {
    res.send("Hello!")
})

// ------------>USER ROUTES<-------------------
// create user 
app.post('/users', async(req:Request, res : Response)=>{
    const {name, email, age, phone} = req.body;
    try {
        const result = await pool.query(`
            INSERT INTO users(name, email, age, phone) VALUES($1, $2, $3, $4) RETURNING *`,
            [name, email, age, phone]
        );
       res.status(201).json({
            success: true,
            message: "Data inserted successfully",
            data : result.rows[0]
        })
      
        
    } catch (error : any) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
})

// get all users 
app.get('/users', async(req: Request, res : Response)=>{
    try {
        const result = await pool.query(`SELECT * FROM users`);
        res.status(201).json({
            success: true,
            message: "User data found",
            data: result.rows
        })
        
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: error.message

        })
    }
})

// get single user by their id 

app.get('/users/:id', async(req:Request, res : Response)=>{
    const id = req.params.id
    try {

        const result = await pool.query(`
            SELECT * FROM users WHERE id = ($1)
            `, [id])
            res.status(201).json({
                success: true,
                message: "User found",
                data : result.rows
            })
        
    } catch (error : any) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
})

// User update route

app.put('/users/:id', async (req: Request, res:Response)=>{
    const {name, email, phone,} = req.body;
 
    try {

        const result = await pool.query(`
            UPDATE users SET name=$1, phone =$2, email=$3 WHERE id= $4 RETURNING *
            `, [name, phone, email, req.params.id])
            res.status(201).json({
                success: true,
                message: "User Updated Successfully",
                data : result.rows
            })
        
    } catch (error : any) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
})

// Delete User 
app.delete('/users/:id', async(req : Request, res : Response)=>{
    try {
        const result = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [req.params.id]);
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: result.rows[0]
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
})

// ------------>TODOS ROUTES<-------------------

// create todos
app.post('/todos', async(req: Request, res: Response)=>{
    const {title, description, user_id} = req.body;

    try {
            const result = await pool.query(`
              INSERT INTO todos(title, description, user_id) VALUES ($1, $2, $3) RETURNING *`, [title, description, user_id]);

              res.status(201).json({
                success: true,
                message : "Todos has been created",
                data : result.rows[0]
              })
    } catch (error :any) {
        res.status(501).json({
            success : false,
            message : error.message
        })
    }


})


app.listen(port, ()=>{
console.log(`Server is listening on port ${port}`);
})