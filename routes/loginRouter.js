const express = require('express');
const loginRouter = express.Router();


loginRouter.get('/login.html', (req, res) => {
    res.render("login.html");
});

module.exports = loginRouter;