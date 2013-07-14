Crafty = require 'crafty'

module.exports = Crafty.c 'Crosshair',
    init: ->
        @requires('2D, Canvas, Grid, Color, Multiway')
        @color('rgb(255,0,0)')
        @attr(w: 80, h: 80)
        @multiway(4, 'W': -90, 'S': 90, 'D': 0, 'A': 180)