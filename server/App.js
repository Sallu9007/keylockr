const express = require("express");
const cors = require("cors");
const router = require("./routes/routers");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8009;

require("./db/conn");


app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(router)


// app.get("/",(req,res)=>{
//     res.status(201).json("server created")
// })


app.listen(port,()=>{
    console.log(`Server was started at the port ${port}`);

})

