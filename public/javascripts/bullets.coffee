Crafty = require 'crafty'

Crafty.c 'Bullets',
    init: ->
        @requires '2D, DOM, Text'
        @attr
            bullets: 3
            x: 900
            y: 30
        @text @bulletsText
        @textFont {'family': "'VT323'", size: '80px', weight: 'bold'}
        @textColor '#ff0000'

    bulletsText: ->
        "#{@bullets}"

    shoot: ->
        if @bullets <= 0
            Crafty.trigger("LoseRound")
        else
            @bullets -= 1
            @text @bulletsText
            Crafty.audio.play('shoot')