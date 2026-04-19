import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cors from 'cors';
import userRoutes from "./routes/userRoutes.js";
import {connectDB} from "./infrastructure/database.js";
import organizationRoutes from "./routes/organizationRoutes.js";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json())

app.use("/users",userRoutes);
app.use("/organizations",organizationRoutes)

app.get('/health',(req,res)=>{
    res.send("User service running")
})

const startServer = async () => {
    try{
        await connectDB();

        app.listen(PORT,()=>{
            console.log(`Server running on port ${PORT}`)
        })
    }
    catch(error){
        console.error("Failed to start server",error)
        process.exit(1)
    }
}
console.log("JWT_SECRET:", process.env.JWT_SECRET);
startServer();