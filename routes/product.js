var express = require("express");
var body_parser = require("body-parser");
const Products = require("../models/Products");
const router = express.Router();
var fs = require("fs");

router.post("/save", async (req, res) => {
    let body = req.body;
    let product = new Products();
    if(body.data.id!="")
    {
        product = await Products.findById(body.data.id);
    }
    product.name = body.data.name;
    product.description = body.data.description;
    product.sizes = body.data.sizes;
    product.colors = body.data.colors;
    product.mrp = body.data.mrp;
    product.price = body.data.price;
    product.instock = body.data.instock;
    product.status = body.data.status;
    product.sku = body.data.sku;
   
    if(body.data.imagecode != ""){
        let base64image = body.data.imagecode.replace(/^data:image\/jpeg;base64,/, "");
        base64image = base64image.replace(/^data:image\/png;base64,/, "");
        product.imagepath = "productpics/" + (Math.random() + 1).toString(36).substring(7) + ".png";
        fs.writeFile("assets/" + product.imagepath , base64image ,'base64',function(err){
            console.log("error image saving " + err);
        });
    }

    product.save().then(result => {
        res.send(JSON.stringify(result));
    }, err => {
        res.send(JSON.stringify(err));
    });

});

router.post("/delete", async (req, res) => {
    let body = req.body
    await Products.findByIdAndDelete(body.data.id);
    let data = {
        "data": {
            "status": "success"
        }

    }
    res.end(JSON.stringify(data));
});

router.post("/list", async (req, res) => {
    let product = await Products.find();
    res.json({ data: product });
});

router.post("/get", async (req, res) => {
    let body = req.body
    let product = await Products.findById(body.data.id);
    res.json({ data: product });
});
// router.post("/findnew",async(req,res)=>{
//     let body=req.body
//     let product = await Products.find({"id":body.data.id});
//     res.json({data:product});
// });

router.post("/changestatus", async (req, res) => {
    let body = req.body;
    let product = new Products();

    product = await Products.findById(body.data.id);

    product.status = body.data.status;

    product.save().then(result => {
        res.send(JSON.stringify(result));
    }, err => {
        res.send(JSON.stringify(err));
    });

});

router.post("/updatestock",async (req,res)=>{
    let body = req.body;
    let product = new Products();

    product = await Products.findById(body.data.id);

    product.instock = body.data.instock;

    product.save().then(result => {
        res.send(JSON.stringify(result));
    }, err => {
        res.send(JSON.stringify(err));
    });


});


module.exports = router;