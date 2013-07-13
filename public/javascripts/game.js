exports.startGame = function(Crafty) {
    Crafty.init(640, 480);
    
    const TYPE_BORDER = "border";
    const TYPE_SCORE = "score";
    const TYPE_PADDLE = "paddle";
    const TYPE_BALL = "ball";
    
    const EVENT_LEFT_HIT = "leftScoreBoardHit";
    const EVENT_RIGHT_HIT = "rightScoreBoardHit";
    
    Crafty.c("Collidable", {
        init: function(entity) {
        },
        collidable: function(type, callback) {
            this._collideCallback = callback;
            this._type = type;
            return this;
        },
        collide: function(collider) {
            if (this._collideCallback)
                this._collideCallback(collider);
        },
        getType: function() {
            return this._type;
        }
    });
    
    /**
    * Movable Component. Automatically moves dX, dY every frame
    */
    Crafty.c("Movable", {
        init: function(entity) {
            this.requires("2D");
            this.bind('EnterFrame', function () {
                this.x += this._dX;
                this.y += this._dY;
                this.trigger("Moved", {x: this.x, y: this.y});
            });
        },
        movable: function(dX, dY) {
            this._dX = dX;
            this._dY = dY;
            return this;
        }
    });
    
    
    Crafty.c("ServerPaddle", {
        init: function(entity) {
            this
            .netBind("KeyDown", function(e) {
                this.trigger("KeyDown", e);
            })
            .netBind("KeyUp", function(e) {
                this.trigger("KeyUp", e);
            })
            .bind("Moved", function(e) {
                this.netTrigger("Moved", e);
            });
        }
    });
    
    Crafty
    .define("CLIENT", function() {
        this.netBind("SceneChange", function(data) {
            this.scene(data.newScene);
        });
    })
    .define("SERVER", function() {
        this.bind("SceneChange", function(data) {
            this.netTrigger("SceneChange", data);
        });
    });

    Crafty.scene("loading", function() {
        Crafty.define("CLIENT", function() {
            Crafty.e("2D, Net")
                .setName("Loading Text")
                .addComponent("DOM, Text")
                .attr({ w: 100, h: 20, x: 150, y: 120 })
                .text("Waiting for other players...")
                .css({ "text-align": "center" });
        });
    });
    
    
    Crafty.scene("main", function() {
        Crafty.define("CLIENT", function() {
            this.background('rgb(138,194,255)');
        });
    });
    
    //automatically play the loading scene
    Crafty.scene("loading");
};

if (typeof require === 'undefined') {
    window.addEventListener('load', 
        function () {
            var shooter = document.getElementById('CLIENT1'),
                targeter = document.getElementById('CLIENT2'),
                clickHandler = function (clientId) {
                    return function () {
                        document.getElementById('buttons').remove();
                        exports.setupDefault(function() { //immediate callback after Crafty with Crafty.net is available
                                //create Crafty Client
                                Crafty = exports.createClient(clientId);
                                
                                //start the loading scene of our game
                                exports.startGame(Crafty);      
                            }, function(socket) { //connect callback
                                //bind to socket
                                exports.setServer(Crafty, socket);      
                            }, function(socket) { // disconnect callback
                        });
                    };
                };

            shooter.addEventListener('click', clickHandler('CLIENT1'));
            targeter.addEventListener('click', clickHandler('CLIENT2'));
        }
    ); 
}
