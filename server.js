var express = require("express");
var server = express();
var bodyParser = require("body-parser");
// const Datastore = require('nedb-promise');
// const db = new Datastore({ filename: 'contacts.db', autoload: true });


server.set("view engine", 'ejs');
server.set("views", __dirname + "/view")

var fileUpload = require("express-fileupload");

server.use(express.static(__dirname + "/public"));
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());
server.use(fileUpload({ limits: { fileSize: 2 * 1024 * 1024 } }))

var DB = require("nedb-promises");
var ContactDB = DB.create(__dirname + "/Contact.db");

server.get("/contact", (req, res) => {
    ContactDB.find({},{"_id":0}).then(results => {
        res.json(results);
    })
});

server.post("/contact", (req, res) => {
    console.log("收到前端資料:", req.body);
    // 1. 先插入資料
    ContactDB.insert(req.body).then(() => {
        console.log("成功存入資料庫:", doc); // 確認資料庫是否回傳成功物件
        // 2. 資料插入成功後，再查詢所有結果並回傳
        return ContactDB.find({});
    }).then(results => {
        res.send(results);// 回傳所有聯絡人資料
    }).catch(err => {
        res.status(500).send("資料庫錯誤");
    });
});


server.listen(8000)