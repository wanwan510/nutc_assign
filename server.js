var express = require("express");
var server = express();
var bodyParser = require("body-parser");
// var DB = require('nedb-promise');

// // const db = new Datastore({ filename: 'contacts.db', autoload: true });
// node_modules

// server.set("view engine", 'ejs');
// server.set("views", __dirname + "/view")

// var fileUpload = require("express-fileupload");

server.use(express.static(path.join(__dirname + "/public")));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// server.use(fileUpload({ limits: { fileSize: 2 * 1024 * 1024 } }))

var DB = require("nedb-promises");
var ContactDB = DB.create(path.join(__dirname + "/Contact.db"));

//grab data 
server.get("/contact", async(req, res) => {
   try {
        const results = await ContactDB.find({}).projection({ _id: 0 });
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: "Read Error" });
    }
});

//store data
server.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;
    
    // 簡單檢查必填欄位
    if (!name || !email || !message) {
        return res.status(400).json({ error: "所有欄位皆為必填" });
    }

    try {
        // 只要有 bodyParser.json()，這裡就能拿到文字資料
        const newDoc = await ContactDB.insert(req.body);
        const allContacts = await ContactDB.find({}).projection({ _id: 0 });
        res.status(201).json(allContacts); 
    } catch (err) {
        res.status(500).json({ error: "Save Error" });
    }
});


server.listen(8000)