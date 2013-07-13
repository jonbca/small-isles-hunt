var npm_crafty = require('npm_crafty');
var path = require('path');
var express = require('express');
var Crafty;
var clients;

setupDefault = function(immediateFN, connectFN, disconnectFN, port) {
    var app = npm_crafty.app = require('express')(),
        server = npm_crafty.server = require('http').createServer(app),
        io = npm_crafty.io = require('socket.io').listen(server),
        path = require('path');

    io.configure(function () {
        io.set('log level', 2);
        io.set('transports', ['xhr-polling']);
    });

    server.listen(process.env.PORT || port || 3000);

    app.get('/npm_crafty.js', function (req, res) {
        res.sendfile(path.join(__dirname, 'node_modules', 'npm_crafty', 'lib', 'npm_crafty.client.js'));
    });
    app.get('/npm_crafty.net.js', function (req, res) {
        res.sendfile(path.join(__dirname, 'node_modules', 'npm_crafty', 'lib', 'npm_crafty.net.js'));
    });
    app.get('/crafty_client.js', function (req, res) {
        res.sendfile(path.join(__dirname, 'node_modules', 'npm_crafty', 'lib', 'crafty_client.js'));
    });


    io.sockets.on('connection', function (socket) {
        console.log("Connected ", socket.id);
        connectFN(socket);

        socket.on('disconnect', function (arg) {
            console.log("Disconnected ", socket.id);
            disconnectFN(socket);
        });
    });

    immediateFN();
};


//setup default server with the following arguments
setupDefault( function () { //immediate callback
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