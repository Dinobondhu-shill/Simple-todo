import initDB, { pool } from "./config/db";
import express, { Request, Response } from "express";
import { userRoutes } from "./modules/users/user.routes";
import { todoRoutes } from "./modules/todos/todoRoutes";
import { authRoute } from "./modules/auth/auth.router";

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

//  auth route
app.use('/auth', authRoute)

export default app;
