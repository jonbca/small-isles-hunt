Crafty = require 'crafty'
Bird = require 'bird'

width = window.innerWidth
height = window.innerHeight

Game =
    width: window.innerWidth
    
    height: window.innerHeight

    start: ->
        Crafty.init width, height
        Crafty.background 'rgb(138,194,255)'

module.exports = Game

global.addEventListener 'load', Game.start