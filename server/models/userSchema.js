const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not a valid Email")
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    cpassword:{
        type:String,
        required:true,
        minlength:6
    },
    token:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});


userSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next()
});


const userdb = new mongoose.model("Users",userSchema)



module.exports = userdb;