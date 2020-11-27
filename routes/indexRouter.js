const express = require('express');
const indexRouter = express.Router();

indexRouter.get('/', (req, res, next) => {
    res.render("index.html");
});

indexRouter.get('/index.html', (req, res, next) => {
    res.render("index.html");
});

module.exports = indexRouter;