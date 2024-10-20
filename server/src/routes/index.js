const express = require("express");
const router = express.Router();
const adminRouter = require("./admin");
const packageRouter = require("./package");
const orderRouter = require("./order");
const contactRouter = require("./contact");
const imageRouter = require("./image");
const menuRouter = require("./menu");
const { checkAuth, refreshTokenAdmin } = require("../middleware/auth");

router.use("/admin", adminRouter);
router.use("/package", packageRouter);
router.use("/order", orderRouter);
router.use("/contacts", contactRouter);
router.use("/image", imageRouter);
router.use("/menu", menuRouter);

router.get("/auth/check", checkAuth);
router.get("/auth/refresh", refreshTokenAdmin)

router.get("/", (req, res) => {
    res.send("API")
})

module.exports = router;
