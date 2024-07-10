const express = require('express');
const router = express.Router();
const foodSetRoutes = require('./foodSet');
const articleRoutes = require('./articleRoutes');


router.use('/foodSet', foodSetRoutes);
router.use('/articles', articleRoutes);


module.exports = router;
