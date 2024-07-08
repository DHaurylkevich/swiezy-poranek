const express = require("express");
const connectDB = require("./src/config/db");
const dotenv = require("dotenv");

dotenv.config()
const app = express();

connectDB();

app.use(express.json());

app.use("/api/orders", require("./routes/orders"));

app.get("/", (req, res) => {
    res.send("Server is running")
});

const port = process.env.PORT || 5000;
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});