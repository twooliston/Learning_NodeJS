const express = require('express');
const liveRouter = express.Router();


liveRouter.get('/live.html', (req, res) => {
    res.render("live.html");
});

module.exports = liveRouter;