
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("node:https");
const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: `${process.env.API_KEY}`,
  server: "us21",
});

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var FirstName = req.body.fName;
  var LastName = req.body.lName;
  var email = req.body.email;
  var listID = "1d68976b31";
  // const run = async () => {
  //   const response = await client.lists.addListMember(listID, {
  //     email_address: email,
  //     status: "subscribed",
  //     merge_fields: {
  //       FNAME: FirstName,
  //       LNAME: LastName,
  //     },
  //   });
  //   console.log(response);
  // };
  //run();
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: FirstName,
          LNAME: LastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/1d68976b31";
  const Options = {
    method: "POST",
    auth: `raghav1:${process.env.API_KEY}`,
  };
  const request = https.request(url, Options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/success.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
  //console.log(firstName, lastName, email);
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server running on port 3000");
});

//API
//61ba5dd4078e0e69cb1a0bbd8b0a67f3-us21

//ID
//1d68976b31
