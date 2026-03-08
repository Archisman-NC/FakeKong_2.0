import {Pool} from "pg";
import { Organization } from "../models/Organization.js";

export class OrganizationRepository{
    constructor(private pool:Pool){}

    async create(org:Organization): Promise<Organization>{
        const query = `INSERT INTO organizations (id, name, created_by)
        VALUES ($1, $2, $3)
        RETURNING id, name, created_by, created_at`;

        const result = await this.pool.query(query,
            [org.id, org.name, org.createdBy]);
        
        const row = result.rows[0];
        
        return {
            id:row.id,
            name: row.name,
            createdBy:row.created_by,
            createdAt:row.created_at 
        }
    }

    async findByUser(userId:string): Promise<Organization[]>{
        const query = `
        SELECT o.id, o.name, o.created_by, o.created_at
        FROM organizations o 
        JOIN organization_members m
        ON o.id = m.organization_id
        WHERE m.user_id = $1
        `;

        const result = await this.pool.query(query,[userId]);

        return result.rows.map((row)=>({
            id: row.id,
            name: row.name,
            createdBy: row.created_by,
            createdAt: row.created_at
        }))
    }

    } 

