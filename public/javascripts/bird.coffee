C = require 'crafty'

module.exports = C.c 'Bird',
    init: ->
        @requires '2D, Canvas, Color'
        @color 'rgb(20, 125, 40)'
        @attr
            w: 100
            h: 100

    at: (x, y) ->
        if x is undefined and y is undefined
            x: @x
            y: @y
        else
            @attr
                x: x
                y: y
            this