const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/auth");
const uploadImages = require("../middleware/upload").uploadImages;
const imageController = require("../controllers/imageController");

router.post("/", authenticateJWT, uploadImages.single("image"), imageController.uploadImage)

router.get("/", imageController.getAllImages);

router.delete("/:id", authenticateJWT, imageController.deleteImage)

module.exports = router;