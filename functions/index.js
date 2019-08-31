const functions = require('firebase-functions');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const FirebaseStore = require('connect-session-firebase')(session);

const { database } = require('./connection');

const app = express();

const userRoute = require('./routes/user/route');
const cropRoute = require('./routes/crop/route');
const landRoute = require('./routes/land/route');
const webRoute = require('./routes/web/route');

app.set('view engine', 'ejs');

app.use(session({
    store: new FirebaseStore({
        database: database
    }),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}));
//Allow CORS Automatically
app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', userRoute);
app.use('/crop', cropRoute);
app.use('/land', landRoute);

app.use('/', webRoute);

app.get('/session', (req, res, next) => {
    req.session.username = "akshay";
    req.session.password = "sdlkls";
    res.send(req.session.username);
});

app.get('/session1', (req, res) => {
    console.log(req.session);
    if (!req.session.username) {
        res.send('false');
    } else {
        res.send('true');
    }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});
// error handler
app.use(function (err, req, res, next) {
    // render the error page
    console.log(err);
    res.status(err.status || 500);
    res.render('404', { status: err.status, message: err.message });
});

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
exports.api = functions.https.onRequest(app);
