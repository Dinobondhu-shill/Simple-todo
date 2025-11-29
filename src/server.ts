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

app.post('/user', async(req:Request, res : Response)=>{
    const {name, email, age, phone} = req.body;
    try {
        const result = await pool.query(`
            INSERT INTO users(name, email, age, phone) VALUES($1, $2, $3, $4) RETURNING *`,
            [name, email, age, phone]
        );
        console.log(result)
        res.send({message: "Data Inserted"})
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error
        })
    }

    res.status(201).json({
        success: true,
        message: "This post method is working perfectly"
    })
})

app.listen(port, ()=>{
console.log(`Server is listening on port ${port}`);
})