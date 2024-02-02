const express = require("express");
const path = require('path');
require('dotenv').config();
const route = require("./route");
const bodyParser = require('body-parser')
const socket = require("./socket");
const app = express();

const PORT = 3000; 
app.use(express.static(path.resolve(__dirname, '../client')));
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
const server = app.listen(PORT, (error) =>{ 
    if(!error) {
      console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
    } else {
      console.log("Error occurred, server can't start", error); 
    }
    } 
); 
const io = socket(server);

app.use((req, res, next) => {
  req.io = io;
    next();
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', '../client/index.html'));
});
route(app)