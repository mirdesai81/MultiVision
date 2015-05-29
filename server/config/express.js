var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    cookieParser = require("cookie-parser"),
    expressSession = require('express-session'),
    path = require('path');

module.exports = function(app, config){
    function compile(src,path) {
        return stylus(src).set('filename' , path);
    }

    app.set('views',path.join(config.rootPath,'/server/views'));
    app.set('view engine', 'jade');
    app.use(stylus.middleware(
        {
            src : config.rootPath + '/public',
            compile: compile
        }
    ));
    app.use(express.static(path.join(config.rootPath,'/public')));
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(expressSession({secret:'multi vision unicorns'}));
    app.use(passport.initialize());
    app.use(passport.session());
};