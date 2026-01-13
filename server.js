var express = require("express");
var server = express();
var bodyParser = require("body-parser");
// const Datastore = require('nedb-promise');
// const db = new Datastore({ filename: 'contacts.db', autoload: true });


server.set("view engine", 'ejs');
server.set("views", __dirname+"/view")

var fileUpload = require("express-fileupload");

server.use(express.static(__dirname + "/public"));
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());
server.use(fileUpload({limits:{fileSize:2*1024*1024}}))

var DB=require("nedb-promises");
var ContactDB = DB.create(__dirname+"/Contact.db");

// server.get("/contact", (req, res) => {
//     ContactDB.find({}).then(results=>{
//         res.send(results);
//     })
// });

server.post("/contact", (req, res) =>{
    ContactDB.insert(req.body);
    //move to public/upload
    // var upFile=req.files.myFile1;
    // upFile.mv(__dirname+"/public/upload/"+upFile.name, function(err){
    //     if(err==null){
    //         res.render("msg",{message:"I got a file: "+upFile.name})
    //     }else{
    //         res.render("msg",{message:err});
    //     }
    })
    ContactDB.find({}).then(results=>{
        res.send(results);
    })



server.listen(80)