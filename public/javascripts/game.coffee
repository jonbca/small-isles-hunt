Crafty = require 'crafty'
Bird = require 'bird'
Crosshair = require 'crosshair'

Game =
    grid:
        width: 12
        height: 8
        tile:
            width: 80
            height: 80

    width: 960
    
    height: 640

    ground_height: 6

    points: 0

    start: ->
        Crafty.init Game.width, Game.height
        Crafty.background 'url(/images/dog-animation-bknd.jpg)'
        Crafty.e('Crosshair').at(2, 2)

module.exports = Game

Crafty.c 'Grid',
    init: ->
        @attr
            w: Game.grid.tile.width
            h: Game.grid.tile.height

    at: (x, y) ->
        if x is undefined and y is undefined
            x: @x/Game.grid.tile.width
            y: @y/Game.grid.tile.height
        else
            @attr
                x: x * Game.grid.tile.width
                y: y * Game.grid.tile.height
            this


global.addEventListener 'load', Game.start