exports.startGame = function(Crafty) {
    Crafty.init(1440, 900);
    
    const TYPE_TARGET = "target";
    
    const map_grid = {
        width: 16,
        height: 11,
        tile: {
            width: 80,
            height: 80
        }
    };

    var width = function width() {
        return map_grid.width * map_grid.tile.width;
    },
    height = function height() {
        return map_grid.height * map_grid.tile.height;
    }

    Crafty.c("Grid", {
        init: function () {
            this.attr({
                w: map_grid.tile.width,
                h: map_grid.tile.height
            })
        },

        at: function (x, y) {
            if (x === undefined && y === undefined) {
                return { x: this.x/map_grid.tile.width, y: this.y/map_grid.tile.height }
            } else {
                this.attr({ x: x * map_grid.tile.width, y: y * map_grid.tile.height });
                return this;
            }
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
    
    
    Crafty.c("Target", {
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

        Crafty.e("2D, Net, Grid")
            .setName("Target")
            .at(1, 1)
            .define("CLIENT", function () {
                this.addComponent("DOM, Color")
                    .color("rgb(255,0,0)")
                    .netBind("Moved", function (newPos) {
                        console.log(newPos);
                        this.at(Math.floor(newPos.x / map_grid.tile.width), Math.floor(newPos.y / map_grid.tile.height));
                    });
            })
            .define("CLIENT2", function () {
                this.bind("KeyDown", function (e) {
                    if (e.key === Crafty.keys["W"] || e.key === Crafty.keys["A"] || e.key === Crafty.keys["S"] || e.key === Crafty.keys["D"]) {
                        if (e.originalEvent)
                            delete e.originalEvent;
                        this.netTrigger("KeyDown", e);
                    }
                })
                .bind("KeyUp", function (e) {
                    if (e.key === Crafty.keys["W"] || e.key === Crafty.keys["A"] || e.key === Crafty.keys["S"] || e.key === Crafty.keys["D"]) {
                        if (e.originalEvent)
                            delete e.originalEvent;
                        this.netTrigger("KeyUp", e);
                    }
                });
            })
            .define("SERVER", function () {
                this.addComponent("Fourway, Target")
                .fourway(10);

                console.log(this);
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
                watcher = document.getElementById('WATCHING'),
                clickHandler = function (clientId) {
                    return function () {
                        var buttons = document.getElementById('buttons');
                        buttons.parentNode.removeChild(buttons);
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
            watcher.addEventListener('click', clickHandler('CLIENT3'));
            // watcher.addEventListener('touchend', clickHandler('CLIENT3'));
        }
    ); 
}
