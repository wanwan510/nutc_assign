var express = require("express");
var server = express();
var bodyParser = require("body-parser");

server.use(express.static(__dirname + "/public"));
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());


var DB = require("nedb-promises");
var ContactDB = DB.create(__dirname + "/Contact.db");

//grab data 
// server.get("/contact", async(req, res) => {
//    try {
//         const results = await ContactDB.find({});;
//         res.json(results);
//     } catch (err) {
//         res.status(500).json({ error: "Read Error" });
//     }
// });

//post data=send data in to create/modify resources,i.e. form submission, file upload
server.post("/contact", (req, res) => {

    const { name, email, message } = req.body;

    //add to database,createdAt=time for send message

    ContactDB.insert({ name, email, message, createdAt: new Date() })
        .then(() => res.json({ status: "ok" }))
        .catch(() => res.status(500).json({ status: "error" }));
});


//grab data
server.get("/messages", (req, res) => {
    ContactDB.find({}).sort({ createdAt: -1 })
        .then(data => res.json(data));
});




server.listen(8000)