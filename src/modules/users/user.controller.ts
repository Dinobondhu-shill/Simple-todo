import { Request, Response } from "express";
import { userService } from "./user.services";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUser(req.body)

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

const getUser = async (req: Request, res: Response) => {
     try {
    const result = await userService.getUser();

    res.status(200).json({
      success: true,
      message: "User data found",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const getSingleUser = async(req:Request, res : Response)=>{
    const id = req.params.id
    try {

        const result = await userService.getSingleUser(id!)
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
}

const updateUser =  async (req: Request, res:Response)=>{
    const id = req.params.id
 
    try {

        const result = await userService.updateUser(req.body, id!)
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
}

const deleteUser =  async(req : Request, res : Response)=>{
    try {
        const result = await userService.deleteUser(req.params.id!)
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
}

export const userController = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
}