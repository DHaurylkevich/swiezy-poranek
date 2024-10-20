const express = require("express");
const connectDB = require("./src/config/db");
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require("dotenv");
const cors = require('cors');
const path = require('path');

dotenv.config();
const app = express();

connectDB();

const allowedOrigins = [
    "https://www.swiezyporanek.com",
    "https://swiezy-poranek.vercel.app",
    "http://localhost:8000",
    "http://192.168.0.186:8000",
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.options('*', cors());

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", require("./src/routes"));

app.use('/uploads', express.static(path.join(__dirname, "./uploads")));

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;