var express = require ("express");
var bodyparser = require("body-parser");
const Admin = require("../models/admin");
var jasonparser = bodyparser.json();
const router = express.Router();

router.post("/login/",async(req,res)=>{
    let body = req.body;
    let admin = await Admin.find({"email":body.data.email,"password":body.data.password});
    let data = {
        data:{
            status:"failed"
        }
    }
    if(admin.length != 0)
    {
        data = {
            data:{
                status : "success",
                admin:admin[0]
            }
        }
    }
   
    res.end(JSON.stringify(data));
});

module.exports = router;