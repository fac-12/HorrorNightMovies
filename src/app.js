const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const helpers = require('./views/helpers/index');

const routes = require('./controllers/routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieSession({
        name: 'session',
        secret: process.env.SECRET,
        maxAge: 24 * 60 * 60 * 1000,
    }))
    // set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine(
    'hbs',
    exphbs({
        extname: 'hbs',
        layoutsDir: path.join(__dirname, 'views', 'layouts'),
        partialsDir: path.join(__dirname, 'views', 'partials'),
        defaultLayout: 'main',
        helpers: helpers,
          })
);

app.set('port', process.env.PORT || 3000);
app.use(favicon(path.join(__dirname, '..', 'public', 'images', 'favicon.png')));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(routes);

module.exports = app;
