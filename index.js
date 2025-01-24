const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
require('dotenv').config();

const routes = require('./Routes/user')
app.use('/api/v1', routes);

// middleware 
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello")
})


app.listen(PORT,()=>{
    console.log(`server is listing on ${PORT}`)
})