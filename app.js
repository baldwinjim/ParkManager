// third-party modules
var express = require('express');
var hbs = require('hbs');
var lib = require('./lib/lib');
var mongoose = require('mongoose');
var path = require('path');
var seconds = require('seconds-in-a');
var session = require('express-session');

// classes, constants, and user modules
var MongoStore = require('connect-mongo')(session);
var routes = require('./routes/routes');

// mongoose setup
var db = mongoose.connect(lib.keys.mongoURI, {
    useMongoClient: true
});

// express setup
var app = express();

app.set('env', process.env.NODE_ENV);
app.set('port', process.env.PORT || lib.config.defaultPort);
app.set('view engine', hbs);

// express middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    cookie: {
        maxAge: seconds.month
    },
    resave: true,
    saveUninitialized: false,
    secret: lib.keys.sessionSecret,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

// routes
app.use('/', routes);

app.listen(lib.config.defaultPort, () => {
    console.log(`Listening on port ${app.get('port')}!`);
});