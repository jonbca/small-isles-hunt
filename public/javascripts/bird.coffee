C = require 'crafty'

module.exports = C.c 'Bird',
    init: ->
        @requires '2D, Canvas, Color'
        @color 'rgb(20, 125, 40)'