const mongoose = require("mongoose")
const DB = "mongodb+srv://Sallu007:RY5Jvu8PLe4gdBf3@keylockr.1fmjutq.mongodb.net/Keylockr"

mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>console.log("DataBase Connected")).catch((errr)=>{
    console.log(errr);
})