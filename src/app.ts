import initDB, { pool } from "./config/db";
import express, { Request, Response } from "express";
import { userRoutes } from "./modules/users/user.routes";
import { todoRoutes } from "./modules/todos/todoRoutes";

const app = express();
app.use(express.json());

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from server");
});


// user route
app.use("/users", userRoutes);

// todo route
app.use("/todos", todoRoutes);

export default app;
