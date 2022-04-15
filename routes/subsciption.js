var express = require("express");
var bodyparser = require("body-parser");
const Subscription = require("../models/Subscription");
const router = express.Router();

router.post("/save/", async (req, res) => {
    let body = req.body;
    let subscription = new Subscription();

    
    subscription.email = body.data.email;



    subscription.save().then(result => {
        res.send(JSON.stringify(result));
    }, err => {
        res.send(JSON.stringify(err));
    });

});

router.post("/list", async (req, res) => {
    let subscription = await Subscription.find();
    res.json({ data: subscription });
});
module.exports = router