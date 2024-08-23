const express = require("express");
const bodyParser = require('body-parser');
const connectDB = require("./src/config/db");
const dotenv = require("dotenv");
dotenv.config()

const app = express();
app.use(bodyParser.json());

connectDB();

app.use("/api", require("../server/src/routes"));

app.get("/", (req, res) => {
    res.send("Server is running")
});

const port = process.env.PORT || 5000;
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});