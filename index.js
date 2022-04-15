var body_parser = require("body-parser");
var express= require("express");
const mongoose = require("mongoose");

var app= express();
mongoose.connect("mongodb+srv://akshay:Akki0000@cluster0.1bevl.mongodb.net/ecom")
var jasonparser = body_parser.json();
app.use(body_parser.json({limit:'50mb'}));
app.use(body_parser.urlencoded({limit:'50mb', extended: true}));

app.use(express.static("assets"));

mongoose.connect("mongodb://localhost:27017/ecommerce");
const db= mongoose.connection;
db.on("error",error=>console.log(error));
db.on("open",()=>console.log("Connection Established"));

app.use(express.json());

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
        if(req.method == "OPTIONS"){
          res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
          return res.status(200).json({});
          } 
          next();
}); 

app.get("/", function(req, res){
          res.send("Hello Welcome to Resume Building");
          res.end();
      });
      
      app.get("/hello", function(req, res){
      
          res.send("This is hello page.");
          res.end();
      });
      
      app.use("/admin", require("./routes/admin")); 
      app.use("/product", require("./routes/product"));     
      app.use("/order", require("./routes/order"));     
      app.use("/subscription", require("./routes/subsciption"));     


const PORT = process.env.PORT || 3000;
app.listen(8081, function(){
          console.log("Welcome e_commerce Server");
})
