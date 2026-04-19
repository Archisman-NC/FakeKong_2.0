interface JwtPayload {
  userID: string;
  email: string;
  iat: number;
  exp: number;
}

import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
    req:Request,
    res: Response,
    next:NextFunction
) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                Message:"Authorization Failed"
            })
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string,
        ) as JwtPayload;

        req.user = {
            id: decoded.userID,
            email: decoded.email
        }
        next();

    }
    catch(error){
        console.error("[authMiddleware]",error);
        return res.status(401).json({
            message:"Authentication Failed"
        })
    }
}
