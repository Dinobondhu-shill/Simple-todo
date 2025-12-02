import { Request, Response } from "express";
import { todoServices } from "./todo.services";

const createTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.createTodo(req.body);

    res.status(201).json({
      success: true,
      message: "Todos has been created",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

const getTodos = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getTodos();
    res.status(202).json({
      success: true,
      message: "Todos data fetched successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const getTodoByUserId = async (req: Request, res: Response) => {
  // console.log(req.params.user_id)

  try {
    const result = await todoServices.getTodoByUserId(req.params.user_id!);
    res.status(200).json({
      success: true,
      Message: "Found specific users todo",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.updateTodo(req.body, req.params.id!);
    res.status(201).json({
      success: true,
      message: "Todo has been updated",
      data: { updated_todo: result.rows },
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteTodo =  async(req: Request, res: Response)=>{
    try {
        const result = await todoServices.deleteTodo(req.params.id!);
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
}
export const todoController = {
  createTodo,
  getTodos,
  getTodoByUserId,
  updateTodo,
  deleteTodo
};
