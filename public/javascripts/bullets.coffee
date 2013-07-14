Crafty = require 'crafty'

Crafty.c 'Bullets',
    init: ->
        @requires '2D, DOM, Text'
        @attr
            bullets: 3
            x: 900
            y: 30
        @text @bulletsText
        @textFont {size: '40px', weight: 'bold'}
        @textColor '#ff0000'

    bulletsText: ->
        "#{@bullets}"

    shoot: ->
        @bullets -= 1
        @text @bulletsText
        if @bullets is 0
            Crafty.trigger("LoseRound")