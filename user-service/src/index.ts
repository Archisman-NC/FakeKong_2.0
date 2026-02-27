import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import userRoutes from "./routes/userRoutes.js";
import {connectDB} from "./infrastructure/database.js";


const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json())
app.use("/users",userRoutes);

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