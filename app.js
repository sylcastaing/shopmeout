// Chargement des modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopmeout');
var LocalStrategy = require('passport-local').Strategy;
var usersModel = require('./models/users/usersModel');
var User = mongoose.model('users', usersModel);

// Chargement de l'application
var app = express();

// Dénition du type de vue utilisé (dans package views sous le format jade)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Gestion des routes
var routes = require('./routes.json');

for (var i in routes['routes']) {
	route = (routes['routes'][i]);
	app.use(route['pattern'], require(route['route']));
}

// Gestion de l'authentification
passport.serializeUser(function (user, done) {
	done(null, user.email);
});

passport.deserializeUser(function (email, done) {
	User.findOne({
		email: email
	}, function(err, user) {
		done(err, user);
	});
});

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'motDePasse'
}, function(email, motDePasse, done) {
	User.findOne({
		email: email,
		motDePasse: motDePasse
	}, function (err, user) {
		if (err) {
			return done(err);
		}
		if (user == null) {
			return done(null, false, { message: 'Identifiants incorrects' });
		}
		else {
			return done(null, user);
		}
	});
}));

// Gestion de l'erreur 404
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
