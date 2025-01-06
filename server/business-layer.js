var express = require("express");
var mangoClient = require("mongodb").MongoClient;
var cors = require("cors");
var app = express();
var constring = "mongodb://127.0.0.1:27017";
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post("/register-user", (req, res) => {
  var user = {
    userId: req.body.userId,
    userName: req.body.userName,
    Email: req.body.Email,
    Password: req.body.Password,
    Mobile: req.body.Mobile,
  };
  mangoClient.connect(constring).then((clientObj) => {
    var db = clientObj.db("todo");
    db.collection("users")
      .insertOne(user)
      .then(() => {
        console.log("user registered succesfully");
        res.end();
      });
  });
});

app.get("/users", (req, res) => {
  mangoClient.connect(constring).then((clientObj) => {
    var db = clientObj.db("todo");
    db.collection("users")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});
app.post("/add-appointment", (req, res) => {
  var appointment = {
    AppointmentId: parseInt(req.body.AppointmentId),
    Title: req.body.Title,
    Description: req.body.Description,
    Date: new Date(req.body.Date),
    userId: req.body.userId,
  };
  mangoClient.connect(constring).then((clientObj) => {
    var db = clientObj.db("todo");
    db.collection("appointments")
      .insertOne(appointment)
      .then(() => {
        console.log("appointment added");
        res.end();
      });
  });
});

app.get("/get-appointment/:userid", (req, res) => {
  mangoClient.connect(constring).then((clientObj) => {
    var db = clientObj.db("todo");
    db.collection("appointments")
      .find({ userId: req.params.userid })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

app.put("/edit-appointment/:id", (req, res) => {
  var id = parseInt(req.params.id);
  var task = {
    AppointmentId: parseInt(req.body.AppointmentId),
    Title: req.body.Title,
    Description: req.body.Description,
    Date: new Date(req.body.Date),
    userId: req.body.userId,
  };
  mangoClient.connect(constring).then((clientObj) => {
    var db = clientObj.db("todo");
    db.collection("appointments")
      .updateOne({ AppointmentId: id }, { $set: task })
      .then(() => {
        console.log("appointment updated");
        res.end();
      });
  });
});
app.delete("/delete-appointment/:id", (req, res) => {
  var id = parseInt(req.params.id);
  mangoClient.connect(constring).then((clientObj) => {
    var db = clientObj.db("todo");
    db.collection("appointments")
      .deleteOne({ AppointmentId: id })
      .then(() => {
        console.log("appointment deleted");
        res.end();
      });
  });
});

app.listen(4004);
console.log(`Server App Started http://127.0.0.1:4004`);
