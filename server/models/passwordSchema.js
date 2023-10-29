const mongoose = require("mongoose")
const CryptoJS = require("crypto-js")


const passwordSchema = new mongoose.Schema({
    UserId:{
        type:String,
        required:true
    },
    webname:{
        type:String,
        required:true,
        trim:true,
    },
    weblink:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6
    }
},
);


passwordSchema.pre("save", async function (next) {
    // console.log("hejrhwek");

    if (this.isModified("password")) {
        this.password = CryptoJS.AES.encrypt(this.password,"hello");
    }
    next()
});


const userPass = new mongoose.model("passwords",passwordSchema)
module.exports = userPass;

