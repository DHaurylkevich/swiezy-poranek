const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/auth");
const adminController = require("../controllers/adminController");

router.post("/login", adminController.loginAdmin);
router.post("/change-password", authenticateJWT, adminController.changePassword);
router.post('/logout', authenticateJWT, adminController.logoutAdmin);

module.exports = router;