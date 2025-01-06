var express = require("express");
const { listen } = require("express/lib/application");
var mangoClient = require("mongodb").MongoClient;

var app = express();

app.get("/", (req, res) => {
  res.send("<h1> </h1>");
  res.end();
});
app.get("/products", (req, res) => {
  mangoClient.connect("mongodb://127.0.0.1:27017").then((clientObj) => {
    var database = clientObj.db("todo");
    database
      .collection("products")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});
app.listen(4000);
console.log(`Server App Started http://127.0.0.1:4000`);
