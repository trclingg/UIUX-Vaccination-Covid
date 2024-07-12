
const express = require("express");

const mongoose = require('mongoose');

const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const port = 8000;


const userModel = require("./app/models/userModel");
const { contactModel } = require("./app/models/contactModel");


mongoose.connect("mongodb://127.0.0.1:27017/CRUD_vaccination_ng")
    .then(() => console.log("Connected to Mongo Successfully"))
    .catch(error => handleError(error));


const { userRouter } = require("./app/routers/userRouter");
const { contactRouter } = require("./app/routers/contactRouter");

// const adminRouter = express.Router();


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
// middleware to print time
app.use("/", (req, res, next) => {
    let today = new Date();
    console.log(`Time Now: ${today}`),
        next();
})

// serve folders as static
app.use(express.static(__dirname + "/app/publics/home/views"));
app.use(express.static(__dirname + "/app/publics/home"));
app.use(express.static(__dirname + "/app/publics/admin"));

// CRUD 
app.get("/", (req, res) => {
    // printUrlReq;
    res.sendFile(__dirname + "/app/publics/home/views/index.html");
});
// user router
app.use("/api/users", userRouter);
// contact router
app.use("/api/contacts", cors(), contactRouter);
// admin user router
app.use("/admin/users", (req, res) => {
    // printUrlReq;
    res.sendFile(__dirname + "/app/publics/admin/view/adminUser.html")
});
// admin contact router
app.use("/admin/contacts", (req, res) => {
    // printUrlReq;
    res.sendFile(__dirname + "/app/publics/admin/view/adminContact.html")
});




