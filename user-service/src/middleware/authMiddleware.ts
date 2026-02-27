import {Request,Response,NextFunction} from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function authMiddleware(
    req:Request,
    res:Response,
    next:NextFunction
){
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message:"No token provided"})
    }

    const token = authHeader.split(" ")[1];

    if (!token){
        return res.status(401).json({ message: "Token missing" });
    }

    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        (req as any).user = decoded;
        next();
    }
    catch{
        res.status(401).json({"Message":"Invalid token"})
    }
}