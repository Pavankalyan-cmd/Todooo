var express = require("express"); // importing the express library

//Creating an Express Application
var app = express();
// defining route
app.get("/", (request, response) => {
  response.send("<h2> hello wellcome to api </h2>");
  response.end();
});

//app.get("/"): This line defines a route that listens for GET requests to the root URL ("/").
//The second argument is a callback function that takes two parameters: request and response. This function is executed whenever a GET request is made to the root URL.

app.get("/products", (req, res) => {
  res.send([
    { name: "tv", price: 45000 },
    { Name: "Mobile", Price: 5500 },
  ]);
  res.end();
});
app.post("/add-product", (req, res) => {
  res.send("post method for saving data ");
  res.end();
});
app.put("/edit-product", (req, res) => {
  res.send("put method modifying and editing data on server");
  res.end();
});
app.delete("/delete-product", (req, res) => {
  res.send("delete method use to delete data");
  res.end();
});
app.get("*", (req, res) => {
  res.send("page not found");
  res.end();
});
app.listen(4000);
console.log(`Server App Started http://127.0.0.1:4000`);
