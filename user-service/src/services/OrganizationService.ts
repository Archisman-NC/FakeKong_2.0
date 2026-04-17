import {Pool} from "pg";
import {v4 as uuidv4} from "uuid";

import { OrganizationRepository } from "../repositories/OrganizationRepository.js";
import { OrganizationMemberRepository } from "../repositories/OrganizationMemberRepository.js";

import { Organization } from "../models/Organization.js";
import { OrganizationMember } from "../models/OrganizationMember.js";

export class OrganizationService {
    private orgRepo: OrganizationRepository;
    private memberRepo: OrganizationMemberRepository;

    constructor(private pool: Pool){
        this.orgRepo = new OrganizationRepository(pool);
        this.memberRepo = new OrganizationMemberRepository(pool);
    }


async createOrganization(userId:string,name:string){

    if(!name||name.trim().length===0){
        throw new Error("VALIDATION_ERROR: Organization Name is required")
    }
    const client = await this.pool.connect()
    
    try{
        await client.query("BEGIN");

        const orgId = uuidv4();

        const org: Organization = {
            id:orgId,
            name,
            createdBy:userId
        };
        const member: OrganizationMember ={
            id:uuidv4(),
            userId,
            organizationId:orgId,
            role:"OWNER"
        }

        const createdOrg = await this.orgRepo.create(client,org)

        await this.memberRepo.addMember(client,member)

        await client.query("COMMIT");

        return createdOrg;
    }
    catch(error){
        await client.query("ROLLBACK");
        throw(error)
    } finally {
        client.release();
    }
}

async getUserOrganizations(userId:string){
    return this.orgRepo.findByUser(userId)
}
}