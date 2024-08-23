const express = require("express");
const router = express.Router();
const foodSetRoutes = require("./foodSet");
const articleRoutes = require("./article");
const adminRouter = require("./admin");


router.use("/foodSet", foodSetRoutes);
router.use("/articles", articleRoutes);
router.use("/admin", adminRouter);

module.exports = router;
