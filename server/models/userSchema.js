const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const keysecret = "salmansanmitrajharshsabmadarchod";

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


// tokern generate
userSchema.methods.generateAuthtoken = async function(){
    try{
        let token_generated = jwt.sign({ _id: this._id }, keysecret, {
            expiresIn: "1d"
        });

        this.token = this.token.concat({ token: token_generated });
        await this.save();
        return token_generated;

    }catch(error){
        console.log("Caught in generateAuthtoken");
    }
}

const userdb = new mongoose.model("Users",userSchema)



module.exports = userdb;