import {Request,Response} from 'express';
import { OrganizationService } from '../services/OrganizationService.js';

export class OrganizationController{
    constructor(private OrgService:OrganizationService){}

    async createOrganization(req:Request,res:Response){
        try{
            const userId = (req as any).user.id;
            const {name} = req.body;
            
            if(!name){
                return res.status(400).json({message:"Name is required"})
            }

            const org = await this.createOrganization(userId,name);

            res.status(201).json(org)
        }
        catch(error){
            console.error(error)
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