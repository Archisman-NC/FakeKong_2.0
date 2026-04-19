import {Pool} from "pg";

export const pool = new Pool({
    host:process.env.DB_HOST,
    port:Number(process.env.DB_PORT),
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})

pool.connect().then(
    client=>{
        console.log("Postgres connected (api-service)");
        client.release()
    }).catch(
        err => {
            console.error("Postgres not connected (api-service)",err)
        }
    )

    