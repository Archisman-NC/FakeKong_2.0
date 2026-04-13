import {Request,Response} from 'express';
import { OrganizationService } from '../services/OrganizationService.js';

export class OrganizationController{
    constructor(private OrgService:OrganizationService){}

    async createOrganization(req:Request,res:Response){
        try{
            const user = (req as any).user;
            console.log("[OrganizationController.createOrganization] req.user:", user);
            const userId = user?.userID ?? user?.userId ?? user?.id;
            console.log("[OrganizationController.createOrganization] resolved userId:", userId);
            const {name} = req.body;
            
            if(!name){
                return res.status(400).json({message:"Name is required"})
            }

            if(!userId){
                return res.status(401).json({message:"Invalid token payload: user id missing"})
            }

            const org = await this.OrgService.createOrganization(userId,name);

            res.status(201).json(org)
        }
        catch(error){
            const pgError = error as {
                message?: string;
                code?: string;
                detail?: string;
                constraint?: string;
                table?: string;
                column?: string;
            };
            console.error("[OrganizationController.createOrganization] failed:", {
                message: pgError?.message,
                code: pgError?.code,
                detail: pgError?.detail,
                constraint: pgError?.constraint,
                table: pgError?.table,
                column: pgError?.column
            });
            res.status(400).json({message:"Failed to create organization"})
        }
    }

    async getOrganization(req:Request,res:Response){
        try{
            const userId = (req as any).user.id;

            const orgs = await this.OrgService.getUserOrganizations(userId);

            res.json(orgs)
        }
        catch(error){
            console.error(error)
            res.status(500).json({message:"Failed to fetch organizations"})
        }
    }

}