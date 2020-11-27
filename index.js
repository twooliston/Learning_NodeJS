const express = require("express");
const session = require('express-session')
const path = require('path');
require('dotenv').config();

const ONE_HOUR = 1000 * 60 * 60;

const app = express();
const {
    PORT = 8080,
    SESS_SECRET = 'secret',
    SESS_LIFETIME = ONE_HOUR
} = process.env;

// set up session
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
     }
}))

// view engine set up
app.set('views', path.join(__dirname, 'static'));
app.set('view engine', 'ejs');
//render HTML files
app.engine('html', require('ejs').renderFile);

// routes
const indexRouter = require('./routes/indexRouter');
const loginRouter = require('./routes/loginRouter');
const homeRouter = require('./routes/homeRouter');
const liveRouter = require('./routes/liveRouter');
const searchRouter = require('./routes/searchRouter');
const showRouter = require('./routes/showRouter');
const uploadRouter = require('./routes/uploadRouter');

const redirectLogin = (req, res, next) => {
    req.session.userId ? next() : res.redirect('/login.html');
};

app.get('/', indexRouter);
app.get('/index.html', indexRouter);
app.get('/login.html', loginRouter);
app.post('/auth', homeRouter);
app.get('/home.html', redirectLogin, homeRouter);
app.get('/show.html', redirectLogin, showRouter);
app.get('/show', showRouter);
app.get('/live.html', redirectLogin, liveRouter);
app.get('/search.html', redirectLogin, searchRouter);
app.get('/upload.html', redirectLogin, uploadRouter);

// listen
app.listen(PORT, err => {
    if (err) return console.log("ERROR", err);
    console.log(`listening on port ${PORT}...`);
});


