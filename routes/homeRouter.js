const express = require('express');
const fs = require('fs');
const { urlencoded } = require("body-parser");
const homeRouter = express.Router();

homeRouter.use(express.json());
homeRouter.use(urlencoded({ extended: false }));

// check if auth user
homeRouter.post("/auth", (req, res, next) => {
    const {username, password} = req.body
    if (auth(username, password)){
        req.session.userId = username;
        res.redirect('/home.html');
    } else {
        res.redirect('/login.html');
    }
});

// route to home page
homeRouter.get('/home.html', (req, res) => {
    res.render("home.html");
});

// authenticate user
function auth(username, password) {
    try {
        const jsonData = fs.readFileSync('./users.json')
        let userData = JSON.parse(jsonData);
        return userData.find(
            (user) =>  user.username === username && user.password === password
        );
    } catch (err) {
        console.error(err)
    }
}

module.exports = homeRouter;