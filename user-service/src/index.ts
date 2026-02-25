import express = require("express");
import userRoutes from "./routes/userRoutes.js"
const PORT = 3001;
const app = express();
app.use(express.json())
app.use("/users",userRoutes);


app.get('/health',(req,res)=>{
    res.send("User service running")
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})