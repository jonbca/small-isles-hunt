Crafty = require 'crafty'

module.exports = Crafty.c 'Crosshair',
    init: ->
        @requires('2D, Canvas, Grid, Color, Fourway')
        @color('rgb(255,0,0)')
        @attr(w: 80, h: 80)
        @fourway(4)