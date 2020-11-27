const express = require('express');
const uploadRouter = express.Router();


uploadRouter.get('/upload.html', (req, res) => {
    res.render("upload.html");
});

module.exports = uploadRouter;