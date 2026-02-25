import { Request, Response } from "express";
import { UserService } from "../services/UserService.js";

export class UserController{

    constructor(private userService: UserService){}

    register = async (req:Request,res:Response) => {
        try{
            const {email,password} = req.body;

            const user = await this.userService.register(email,password);

            res.status(201).json(
                {
                    id: user.id,
                    email: user.email
                }
            )
        }
        catch (error:any){
            res.status(400).json({ message: error.message });
        }
    }

    login = async (req:Request,res:Response) => {
        try{
            const {email,password} = req.body;

            const result = await this.userService.login(email,password);

            res.json(result)
        }
        catch(error:any){
            res.status(400).json({message: error.message})
        }
    }
}