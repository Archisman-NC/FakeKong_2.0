import { Pool } from "pg";
import { Api } from "../models/Api";

export class ApiRepository {
  constructor(private pool: Pool) {}

  private mapRowToApi(row: any): Api {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      baseUrl: row.base_url,
      organizationId: row.organization_id,
      createdBy: row.created_by,
      status: row.status,
      createdAt: row.created_at
    };
  }

  async createApi(
    name: string,
    description: string | undefined,
    baseUrl: string,
    organizationId: string,
    createdBy: string
  ): Promise<Api> {
    const result = await this.pool.query(
      `
      INSERT INTO apis (name, description, base_url, organization_id, created_by)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
      `,
      [name, description || null, baseUrl, organizationId, createdBy]
    );

    return this.mapRowToApi(result.rows[0]);
  }

  async findByOrg(organizationId: string): Promise<Api[]> {
    const result = await this.pool.query(
      `
      SELECT * FROM apis
      WHERE organization_id = $1
      ORDER BY created_at DESC;
      `,
      [organizationId]
    );

    return result.rows.map(row => this.mapRowToApi(row));
  }

  async findById(apiId: string, organizationId: string): Promise<Api | null> {
    const result = await this.pool.query(
      `
      SELECT * FROM apis
      WHERE id = $1 AND organization_id = $2;
      `,
      [apiId, organizationId]
    );

    if (result.rows.length === 0) return null;

    return this.mapRowToApi(result.rows[0]);
  }
}