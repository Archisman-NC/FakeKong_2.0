import {Request, Response, NextFunction} from 'express';
import { pool } from '../infrastructure/database.js';
import { OrganizationMemberRepository } from '../repositories/OrganizationMemberRepository.js';

const memberRepo = new OrganizationMemberRepository(pool);

export const organizationMiddleware = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try{
    const orgId = req.header("X-organization-Id")

    if(!orgId){
        return res.status(400).json({"Message":"Organization Id is required"})
    }

    const user = (req as any).user;

    if(!user){
        return res.status(401).json({"Message":"Unauthorized"})
    }

    const membership = await memberRepo.findMembership(user.userID,orgId)

    if(!membership){
        return res.status(403).json({"Message":"Access denied"})
    }

    (req as any).organization = {
        id:orgId,
        role:membership.role
    };
    next();}
    catch(error){
        console.error(error)
        return res.status(500).json({"Message":"Organization middleware failed"})
    }
}