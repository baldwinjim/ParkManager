// third-party modules
var express = require('express');
var hbs = require('hbs');
var lib = require('./lib/lib');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var seconds = require('seconds-in-a');
var session = require('express-session');

// classes, constants, and user modules
var MongoStore = require('connect-mongo')(session);
var routes = require('./routes/routes');

// hbs setup
hbs.registerPartials(path.join(__dirname, 'public', 'partials'));

// mongoose setup
mongoose.Promise = global.Promise;
var db = mongoose.connect(lib.keys.mongoURI, {
    promiseLibrary: global.Promise,
    useMongoClient: true
});

db.on('open', () => {
    console.log('Connected to MongoDB database.');
});

// express setup
var app = express();

app.set('env', process.env.NODE_ENV);
app.set('port', process.env.PORT || lib.config.defaultPort);
app.set('view engine', hbs);

// express middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
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