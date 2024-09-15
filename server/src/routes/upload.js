// const express = require("express");
// const upload = require("../middleware/upload");
// const router = express.Router();

// router.post('/', upload.single('image'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ message: 'No file uploaded.' });
//     }
//     const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

//     res.status(200).json({ message: 'File uploaded successfully!', file: req.file, url: fileUrl });
// });

// module.exports = router;ф