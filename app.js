
/**
 * Module dependencies.
 */

var npm_crafty = require('npm_crafty');
var express = require('express');

var path = require('path');

var Crafty;

//setup default server with the following arguments
npm_crafty.setupDefault( function () { //immediate callback
    npm_crafty.app.configure('development', function () {
        npm_crafty.app.use(require('connect-livereload')({port: 35729}));
    });

    //setup additional get requests
    npm_crafty.app.use(express.static(path.join(__dirname, 'build')));

    //create Crafty Server and bind it to "Room1"
    Crafty = npm_crafty.createServer("Room1");

    //server will receive event from client back
    Crafty.netBind("CustomEvent", function(msg) {
        console.log("2. Server receive event");
    });

}, function (socket) { //connect callback

    //bind client socket to crafty instance, thus "Room1"
    npm_crafty.addClient(Crafty, socket);

    //send event to newly connected client
    Crafty.netTrigger("CustomEvent", "customData");

}, function (socket) { //disconnect callback
}, process.env.PORT || 3000);