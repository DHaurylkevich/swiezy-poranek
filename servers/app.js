const express = require("express");
const mongoose = require("mongoose");
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/swiezy-poranek', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log("Connected to MongoDB"))
.catch(err => console.error("Failed to connect to MongoDB", err));

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});