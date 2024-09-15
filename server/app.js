const express = require("express");
const connectDB = require("./src/config/db");
const dotenv = require("dotenv");
const cors = require('cors');
const path = require('path');


dotenv.config();
const app = express();

connectDB();

// Настройка CORS
app.use(cors({
    origin: "http://localhost:8000" || "http://192.168.0.186:8000", 
    credentials: true 
}));

app.use(express.json());

// Маршруты API
app.use("/api", require("./src/routes"));

app.use('/uploads', express.static(path.join(__dirname, "./uploads")));

app.get("/", (req, res) => {
    res.send("Server is running");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});