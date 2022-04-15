const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },

    sizes: {
        type: Array,
        required:true
    },
    colors: {
        type: Array
    },
    mrp: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    instock: {
        type: String,
         require: true
    },
    status: {
        type: String,
        require: true
    },
    sku: {
        type: String,
        require: true
    },
    imagepath:{
        type : String
    }

});
const Products = mongoose.model("products", schema);
module.exports = Products;