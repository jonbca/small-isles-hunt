C = require 'crafty'

module.exports = C.c 'Bird',
    init: ->
        @requires('2D, Canvas, Grid, Color, Multiway')
        @color('rgb(147,224,0)')
        @attr(w: 80, h: 80)
        @multiway(4, 'UP_ARROW': -90, 'DOWN_ARROW': 90, 'RIGHT_ARROW': 0, 'LEFT_ARROW': 180)