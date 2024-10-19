const express = require('express');
const router = express.Router();
const { authenticateJWT } = require("../middleware/auth");
const contactController = require('../controllers/contactController');

router.get('/', contactController.getAllContacts);

router.get('/:id', contactController.getContactById);

router.post('/', authenticateJWT, contactController.createContact);

router.put('/:id', authenticateJWT, contactController.updateContact);

router.delete('/:id', authenticateJWT, contactController.deleteContact);

module.exports = router;