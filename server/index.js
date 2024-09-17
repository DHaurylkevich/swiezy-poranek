const express = require("express");
const connectDB = require("./src/config/db");
const morgan = require('morgan');
const dotenv = require("dotenv");
const cors = require('cors');
const path = require('path');

dotenv.config();
const app = express();


connectDB();

// Настройка CORS
const allowedOrigins = [
    "http://localhost:8000",
    "http://192.168.0.186:8000",
    "https://swiezy-poranek.vercel.app"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// Логирование запросов
app.use(morgan("dev"));
app.use(express.json());

// Маршруты API
app.use("/api", require("./src/routes"));

// Статические файлы
app.use('/uploads', express.static(path.join(__dirname, "./uploads")));

// Главный маршрут
app.get("/", (req, res) => {
    res.send("Server is running");
});

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Запуск сервера
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});