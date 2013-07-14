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

    @bird = Crafty.e('Eagle').at(11, 7)

    @crosshair = Crafty.e('Crosshair').at(2, 2)

    @score = Crafty.e('Score').bind('Hit', ->
            console.log('Hit')
            @addPoints()
        )
    
    @bullets = Crafty.e('Bullets').bind('Shoot', ->
            console.log('Shoot')
            @shoot()
        )

    @bind('KeyDown', (e) ->
            if e.key is Crafty.keys['SPACE']
                Crafty.trigger('Shoot')
        )

    Crafty.audio.play('theme')
, ->
    @bullets.unbind('Shoot')
    @score.unbind('Hit')
    @unbind('KeyDown')

Crafty.scene 'Loading', ->
    console.log 'Loading'
    Crafty.e('2D, DOM, Text')
        .text('Loading...')
        .attr({ x: 0, y: Game.height/2 - 24, w: Game.width })
        .css({ 'font-size': '24px', 'font-family': 'sans-serif', 'color': 'white', 'text-align': 'center' })

    Crafty.load [
        'sounds/shot_sound_effect.mp3',
        'images/dog-animation.gif',
        'images/eagle-animation.png',
        'images/goose-animation.png',
        'images/crosshair-80x80.png'
        ], ->
            Crafty.audio.add
                shoot: ['sounds/shot_sound_effect.mp3'],
                theme: ['sounds/duck_hunt_theme.mp3']
    
            Crafty.sprite 80, 'images/goose-animation.png',
                spr_goose: [0, 0]

            Crafty.sprite 80, 'images/eagle-animation.png',
                spr_eagle: [0, 0]

            Crafty.sprite 80, 'images/crosshair-80x80.png',
                spr_crosshair: [0, 0]

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