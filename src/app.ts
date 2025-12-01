import initDB, { pool } from "./config/db";
import express, { Request, Response }  from "express";
import { userRoutes } from "./modules/users/user.routes";



const app = express();
app.use(express.json());

initDB();

app.get('/', (req : Request, res : Response)=>{
    res.send("Hello from server")
})
// ------------>USER ROUTES<-------------------
// create user 
app.use('/users', userRoutes)

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

// get todos 
app.get('/todos', async(req: Request, res:Response)=>{
    try {
        
        const result = await pool.query(`
            SELECT * FROM todos
            `);
        res.status(202).json({
            success:true,
            message: "Todos data fetched successfully",
            data : result.rows
        })

    } catch (error:any) {
       res.status(404).json({
        success: false,
        message : error.message
       }) 
    }
})

// Get todos data by user id 

app.get('/todos/:user_id', async (req : Request, res : Response)=>{
    // console.log(req.params.user_id)

    try {
        const result = await pool.query(`
            SELECT * FROM todos WHERE user_id=$1
            `, [req.params.user_id])

            res.status(200).json({
                success: true, 
                Message : "Found specific users todo",
                data : result.rows
            })
    } catch (err : any) {
        res.status(404).json({
        success: false,
        message : err.message
       }) 
    }

})

// Update todos 
app.put('/todos/:id', async(req : Request, res: Response)=>{
    const {title, description, isCompleted} = req.body
    try {
        const result = await pool.query(`
            UPDATE todos SET title= $1, description=$2, isCompleted=$3 WHERE id=$4 RETURNING *`, [
                title, description, isCompleted, req.params.id
            ])

            res.status(201).json({
                success: true,
                message : "Todo has been updated",
                data : {updated_todo : result.rows}
            })
    } catch (err : any) {
        res.status(404).json({
        success: false,
        message : err.message
       }) 
    }

} )

app.delete('/todos/:id', async(req: Request, res: Response)=>{
    try {
        const result = await pool.query(`
            DELETE FROM todos WHERE id=$1 RETURNING *`, [req.params.id]);
        res.status(200).json({
            success: true,
            message : "Todo has been deleted",
            data : result.rows[0]
        })
    } catch (err : any) {
        res.status(500).json({
        success: false,
        message : err.message
       }) 
    }
})

export default app;