var npm_crafty = require('npm_crafty');
var path = require('path');
var express = require('express');
var Crafty;
var clients;

//setup default server with the following arguments
npm_crafty.setupDefault( function () { //immediate callback
    //setup additional get requests
    npm_crafty.app.get('/', function (req, res) {
        res.sendfile(path.join(__dirname, 'public', 'index.html'));
    });

    npm_crafty.app.use(express.static(path.join(__dirname, 'public')));
        
    //create Crafty Server and bind it to "Room1"
    Crafty = npm_crafty.createServer("Room1");
    
    //start the loading scene of our game
    var pongBasic = require('./public/javascripts/game.js');
    pongBasic.startGame(Crafty);

    //make a client counter -> if it reaches 2, start the main scene
    clients = 0;
    
}, function (socket) { //connect callback
    //bind to socket
    npm_crafty.addClient(Crafty, socket);
    
    //increase client counter
    clients++;
    if (clients === 2) { //2 clients connected
        //start main scene
        Crafty.scene("main");
    }
    
}, function (socket) { //disconnect callback
    //socket will auto leave room
    
    clients--;
    //start the loading scene again
    Crafty.scene("loading");
}, process.env.PORT || 3000);

//TODO auto manage rooms and clients;