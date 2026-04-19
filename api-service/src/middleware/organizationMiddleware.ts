import { Request, Response, NextFunction } from "express";
import { pool } from "../infrastructure/database";

export const organizationMiddleware = async (
    req:Request,
    res:Response,
    next:NextFunction
) =>  {
    try{
        const orgId = req.header("X-Organization-Id");

        if(!orgId|| typeof(orgId) !== "string"){
            return res.status(400).json({"Message":"X-organization-Id header required"})
        }

        if(!req.user?.id){
            return res.status(401).json({
                "Message":"Unauthorized"
            })
        }

        const result = await pool.query(
            `
            SELECT role
            FROM organization_members
            WHERE user_id = $1 AND organization_id = $2
            LIMIT 1 
            `,
            [req.user.id, orgId]
        )

        if(result.rows.length ===0){
            return res.status(403).json({
                "Message":"User is not a member of this organization"
            })
        }

        req.organization = {
            id:orgId,
            role:result.rows[0].role
        }
        next();
    }
    catch(error){
        console.error("[Organization Validation Error",error);
        return res.status(500).json({"Message":"Organization middleware Failed"})
    }

}