const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema(
    {
    orderdate: {
        type: Date,
        require: true
    },
    productid: {
        type: String,
        require: true
    },
    size: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    mobileno: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    pincode: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    shipping: {
        type: String,
        require: true
    },
    total: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    imagepath:{
        type:String,
    },
    productname:{
        type:String,
    }
}
);
const Orders = mongoose.model("orders", schema);
module.exports = Orders;