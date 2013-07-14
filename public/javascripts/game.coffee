Crafty = require 'crafty'
Bird = require 'bird'
Crosshair = require 'crosshair'
Score = require 'score'
Bullets = require 'bullets'
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

    start: ->
        Crafty.init Game.width, Game.height
        Crafty.background 'url(/images/dog-animation-bknd.jpg)'
        Crafty.scene 'Loading'

Crafty.scene 'Game', ->
    console.log 'Game'
    Crafty.e('Crosshair').at(2, 2)

    Crafty.e('Score').bind('Hit', ->
            console.log('Hit')
            @addPoints()
        )
    
    Crafty.e('Bullets').bind('Shoot', ->
            console.log('Shoot')
            @shoot()
        )

    Crafty.bind('KeyDown', (e) ->
            if e.key is Crafty.keys['SPACE']
                Crafty.trigger('Shoot')
        )

Crafty.scene 'Loading', ->
    console.log 'Loading'
    Crafty.e('2D, DOM, Text')
        .text('Loading...')
        .attr({ x: 0, y: Game.height/2 - 24, w: Game.width })
        .css({ 'font-size': '24px', 'font-family': 'sans-serif', 'color': 'white', 'text-align': 'center' })

    Crafty.load ['sounds/shot_sound_effect.mp3'], ->
        Crafty.audio.add
            shoot: ['sounds/shot_sound_effect.mp3']
    
        Crafty.scene 'Game'

module.exports = Game

Crafty.audio.supported['mp3'] = true

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