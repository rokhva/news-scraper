
//npm packages
const express = require("express");
const mongoose = require("mongoose");
const expressHandlebars = require("express-handlebars");

//port
let PORT = process.env.PORT || 3000;

//initialize express
let app = express();

//set up express router
let router = express.Router();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set up public folder to populate the landing page
app.use(express.static(__dirname + "/public"));

//connect handlebars to the express app
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//every request will go through the router
app.use(router);

// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

//or this way??
// let db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines"

// mongoose.connect(db, function (err){
//     if(err){
//         console.log(error);
//     }
//     else{
//         console.log("mongoose connection successful")
//     }
// });


//listen on port
app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`);
})
