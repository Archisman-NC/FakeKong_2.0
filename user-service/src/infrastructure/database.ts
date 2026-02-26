import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const {Pool} = pkg;

export const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

export const connectDB = async () => {
    try{
        await pool.connect()
        console.log("Postgres connected!")
    }
    catch(error){
        console.error("DB connection error",error)
        process.exit(1)
    }
}