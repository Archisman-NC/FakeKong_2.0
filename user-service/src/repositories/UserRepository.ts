import { pool } from "../infrastructure/database.js";
import { User } from "../models/User.js";

export class UserRepository{
    async create(user:User): Promise<User>{
        const query = `
      INSERT INTO users (id, email, password)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [user.id,user.email,user.password]
    const results = await pool.query(query,values)

    return results.rows[0]

    }
    async findByEmail(email: string): Promise<User | null> {
    const query = `SELECT * FROM users WHERE email =$1`;
    const result = await pool.query(query,[email]);

    return result.rows[0] || null

    }
    async findById(id:string): Promise<User|null>{
      const query = `SELECT * FROM users WHERE id=$1`;
      const result = await pool.query(query,[id])

      return result.rows[0] || null
    }
}