const express = require("express");
const router = new express.Router();
const userdb = require("../models/userSchema")
const userPass = require("../models/passwordSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate")



router.post("/register",async(req,res)=>{
    const { fname, email, password, cpassword } = req.body;

    if (!fname || !email || !password || !cpassword) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {

        const preuser = await userdb.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This Email Already Exist" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Password and Confirm Password Not Match" })
        } else {
            const finalUser = new userdb({
                fname, email, password, cpassword
            });

            // here password hasing

            const storeData = await finalUser.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeData })
        }

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }
});


// user Login

router.post("/login", async (req, res) => {
    // console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }
    try {
       const userValid = await userdb.findOne({email:email});

        if(userValid){

            const isMatch = await bcrypt.compare(password,userValid.password);

            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
            }else{

                // token generate
                const token = await userValid.generateAuthtoken();

                // cookiegenerate
                res.cookie("usercookie", token, {
                    expires: new Date(Date.now()+9000000),
                    httpOnly: true,
                    path:'/'
                });

                const result = {
                    userValid,
                    token
                }
                res.status(201).json({ status:201, result })
                // res.send(`Cookie ${result}`)
                // console.log(req.cookie.usercookie);
            }
        }

    } catch (error) {
        res.status(401).json(error);
        console.log("catch block");
    }
});


router.post("/generatepass",async(req,res)=>{
    // console.log("HErE");
    // res.send(validUserOne);

    const { UserId, webname, weblink, password, cpassword } = req.body;
    // console.log(req.body);
    // console.log(UserId);

    if (!webname || !weblink || !password ) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {

        // const preuser = await userPass.findOne({ weblink: weblink });

        // if (preuser) {
        //     res.status(422).json({ error: "This weblink Already Exist" })
        // } else if (password !== cpassword) {
        if (password !== cpassword) {
            res.status(422).json({ error: "Password and Confirm Password Not Match" })
        } else {
            const finalPass = new userPass({
                
                UserId,webname, weblink, password
            });
            // console.log(finalPass);

            // here password hasing

            const storeData = await finalPass.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeData })
        }

    } catch (error) {
        res.status(422).json(error);
        console.log("save catch block error");
    }
});

// uservalid
router.get("/validuser", authenticate, async(req, res) => {
    try {
        const validUserOne = await userdb.findOne({_id: req.userId});
        // console.log(req.userId);
        // console.log(userId);
        // console.log(_id);
        // console.log(validUserOne._id);
        res.status(201).json({status: 201, validUserOne});
    } catch (error) {
        res.status(401).json({status: 401, error});
    }
})

// user logout
router.get("/logout", authenticate, async(req, res) => {
    try {
        req.rootUser.token = req.rootUser.token.filter((curelem) => {
            return curelem.token != req.token
        })

        res.clearCookie("usercookie", {path: "/"});
        req.rootUser.save()
        res.status(201).json(req.rootUser.token)
    } catch (error) {
        res.status(201).json({status: 401, error})
    }
})


router.get("/getAllPass", async(req,res)=>{
    try {
        const UserId = await req.header('userID')
        const AllPass = await userPass.find({UserId:UserId});
        // const AllPass = await userPass.find({});
        res.send({status:"ok", data:AllPass})
    } catch (error) {
        console.log("error in fetch");
    }
})

router.get("/getAllUsers", authenticate, async(req,res)=>{
    try {
        // res.send(`id:${req.rootUser.userId}`)
        // console.log(`id:${req.rootUser.userId}`)
        const AllPass = await userdb.find({});
        // console.log(AllPass);
        res.send({status:"ok", data:AllPass})
    } catch (error) {
        console.log("error in fetch");
    }
})

router.post("/deletePass", async(req,res)=>{
    console.log(`this is req.body.id - ${req.body.id}`);
    // console.log(`THIS IS QUERYID${req.query.id}`);
    const PassId = req.body.id
    console.log(`this is PassID -${PassId}`);
    try {
        console.log("here");
        await userPass.deleteOne({_id:PassId})
        res.send({status:"ok", data:"Deleted"})

        
    } catch (error) {
        console.log("cant delete")
        
    }

})


module.exports = router;