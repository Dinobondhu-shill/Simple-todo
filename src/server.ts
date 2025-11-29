import express, { Request, Response } from 'express';
const app = express();
const port = 5000;

app.use(express.json());

app.get('/', (req :Request, res : Response)=> {
    res.send("Hello from next level developer!")
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