Crafty = require 'crafty'

Crafty.c 'Score',
    init: ->
        @requires '2D, DOM, Text'
        @attr
            points: 0
            x: 30
            y: 30
        @text(@scoreText)
        @textColor('#ffffff')
        @textFont({size: '40px', weight: 'bold'})

    scoreText: ->
        "#{@points}"

    addPoints: ->
        points = @attr 'points'
        @attr points: points + 500
        @text @scoreText