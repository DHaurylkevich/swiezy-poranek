const express = require("express");
const router = express.Router();
const adminRouter = require("./admin");
const packageRouter = require("./package");
const orderRouter = require("./order");
const uploadRouter = require("./upload");
const contactRouter = require("./contact");
const imageRouter = require("./image");

router.use("/admin", adminRouter);
router.use("/package", packageRouter);
router.use("/order", orderRouter);
router.use("/uploads", uploadRouter);
router.use("/contacts", contactRouter);
router.use("/image", imageRouter);


module.exports = router;
