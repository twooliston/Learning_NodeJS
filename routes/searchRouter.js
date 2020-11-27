const express = require('express');
const searchRouter = express.Router();


searchRouter.get('/search.html', (req, res) => {
    res.render("search.html");
});

module.exports = searchRouter;