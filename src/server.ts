import express, { Request, Response } from 'express';
import {Pool} from "pg"
const app = express();
const port = 5000;
app.use(express.json());


// DB
const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_qRJ6rPUcYy1C@ep-twilight-wave-a4j6h31q-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
})

const initDB = async()=>{
    pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email  VARCHAR(100) NOT NULL UNIQUE,
            age INT,
            phone VARCHAR(15) UNIQUE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
        `)
}

initDB();


app.get('/', (req :Request, res : Response)=> {
    res.send("Hello!")
})

app.post('/', (req:Request, res : Response)=>{
    console.log(req.body);

    res.status(201).json({
        success: true,
        message: "This post method is working perfectly"
    })
})

app.listen(port, ()=>{
console.log(`Server is listening on port ${port}`);
})