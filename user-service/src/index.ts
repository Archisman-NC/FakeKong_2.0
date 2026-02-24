import express = require("express");
const PORT = 3001;
const app = express();

app.use(express.json());

app.get('/health',(req,res)=>{
    res.send("User service running")
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})