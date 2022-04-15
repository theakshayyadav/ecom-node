var express = require("express");
var bodyparser = require("body-parser");
const Orders = require("../models/Order");
const router = express.Router();
var nodemailer = require("nodemailer");

router.post("/place", async (req, res) => {
    let body = req.body;
    let order = new Orders();

    order.orderdate=body.data.orderdate;
    order.productid=body.data.productid;
    order.productname=body.data.productname;
    order.size=body.data.size;
    order.color=body.data.color;
    order.name=body.data.name;
    order.email=body.data.email;
    order.mobileno=body.data.mobileno;
    order.address=body.data.address;
    order.pincode=body.data.pincode;
    order.quantity=body.data.quantity;
    order.price=body.data.price;
    order.shipping=body.data.shipping;
    order.total=body.data.total;
    order.status="pending";
    order.imagepath = body.data.imagepath;


    order.save().then(result => {
        res.send(JSON.stringify(result));
    }, err => {
        res.send(JSON.stringify(err));
    });

});


router.post("/list", async (req, res) => {
    let order = await Orders.find();
    res.json({ data: order });
});


router.post("/get", async (req, res) => {
    let body = req.body
    let order = await Orders.findById(body.data.id);
    res.json({ data: order });
});


router.post("/changestatus", async (req, res) => {
    let body = req.body;
    let order = new Orders();

    order = await Orders.findById(body.data.id);

    order.status = body.data.status;

    order.save().then(result => {
        res.send(JSON.stringify(result));
    }, err => {
        res.send(JSON.stringify(err));
    });

});

router.post("/delete", async (req, res) => {
    let body = req.body
    await Orders.findByIdAndDelete(body.data.id);
    let data = {
        "data": {
            "status": "success"
        }

    }
    res.end(JSON.stringify(data));
});


router.post("/paymentsuccess", async (req, res) => {
    let body = req.body;
    let order = await Orders.findById(body.data.id);

    order.status = "paid";
    order.save().then(result => {

        // send Email to admin and user
        let body = getadminmail(order);
        sendmail("shreyakad653@gmail.com", "Order received", body);

        body = getusermail(order);
        sendmail(order.email, "Hello " + order.name + ", your order received", body);
        res.send(JSON.stringify(result));
    }, err => {
        res.send(JSON.stringify(err));
    });

});



function getadminmail(order){
    return body = "Hello admin, order received ";
}

function getusermail(order){
    return body = "Hello user, order received ";
}

function sendmail(to, subject, body){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'shreyakad653@gmail.com',
          pass: 'shreyakad653'
        }
      });    
      var mailOptions = {
        from: 'shreyakad653@gmail.com',
        to: to,
        subject: subject,
        text: body
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = router;