// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Require dotenv for environment API keys
// const dotenv = require('dotenv');
// dotenv.config();


// Declaring port to listen to
const PORT = 8000;

//starting instance of express
const app = express();

// Cors for cross origin allowance
app.use(cors());
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let tripdata = {}

// Initialize the main project folder
app.use(express.static("dist"));

//Declaring default startup page only for testing
app.get("./", function(req, res){
    res.sendFile("/index.html") 
});



// Setting data from other servers and saving it to tripdata variable
app.post("/postdata", async (req, res) => {
  try {
    console.log("Request to postdata is received");
    tripdata = req.body
    res.status(200).send({"message":"successful"})
  } catch (e) {
    res.sendStatus(404)
  }
});

// getting data from other servers and sending response
app.get("/getdata", async (req, res) => {
  try {
    console.log("Request for get data is received");
    res.status(200).send(tripdata)
  } catch (e) {
    res.sendStatus(404)
  }
});

let mult = (a,b)=>{
  return a*b
}

// app is listening to port 8000
app.listen(PORT, () => console.log(`travel planner app is listening to https://localhost:${PORT}`));


module.exports = mult;