const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();


// for static files
app.use(express.static("public"));
// use bodyParser
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/0a20d1d3c5",
    method: "POST",
    headers: {
      "Authorization": "henryjerry 6efa519b61b5f43b590bcd58a9d99754-us20"
    },
    body: jsonData
  }

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html")
    } else {
      if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html")
    }else{
      res.sendFile(__dirname + "/failure.html")
    }
    }
  });

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.post("/success", function(req, res){
  res.redirect("/");
});

// test server connection
app.listen(process.env.PORT || 3000, function(req, res) {
  console.log("Your are connected to port 3000");
});

// 6efa519b61b5f43b590bcd58a9d99754-us20
// 0a20d1d3c5
// 6efa519b61b5f43b590bcd58a9d99754-us20
