import {Pool,PoolClient} from "pg";
import {
    OrganizationMember,
    OrganizationRole
} from "../models/OrganizationMember.js";

export class OrganizationMemberRepository{
    constructor(private pool:Pool){}

    async addMember(client:PoolClient,member:OrganizationMember): Promise<void>{
        const query = `
        INSERT INTO organization_members
        (id, user_id, organization_id, role)
        VALUES ($1, $2, $3, $4)
        `;

        await client.query(query,[
            member.id,
            member.userId,
            member.organizationId,
            member.role,
        ]);


    }

    async findMembership(
    userId: string,
    orgId: string
    ): Promise<OrganizationMember | null> {
    const query = `
    SELECT id, user_id, organization_id, role, created_at
    FROM organization_members
    WHERE user_id = $1 AND organization_id = $2
    `;

    const result = await this.pool.query(query, [userId, orgId]);

    if (!result.rowCount) return null;

    const row = result.rows[0];

    return {
        id: row.id,
        userId: row.user_id,
        organizationId: row.organization_id,
        role: row.role as OrganizationRole,
        createdAt: row.created_at
    };
}
}