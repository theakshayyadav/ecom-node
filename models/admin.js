const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema({
    name:{type:String},
    email:{type:String},
    mobileno:{type:String},
    password:{type:String}
});
const Admin = mongoose.model("admins",schema);
module.exports = Admin;