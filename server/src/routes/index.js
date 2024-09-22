const express = require("express");
const router = express.Router();
const adminRouter = require("./admin");
const packageRouter = require("./package");
const orderRouter = require("./order");
const contactRouter = require("./contact");
const imageRouter = require("./image");
const menuRouter = require("./menu");

router.use("/admin", adminRouter);
router.use("/package", packageRouter);
router.use("/order", orderRouter);
router.use("/contacts", contactRouter);
router.use("/image", imageRouter);
router.use("/menu", menuRouter)

router.get("/", (req, res) => {
    res.send("API")
})

module.exports = router;
