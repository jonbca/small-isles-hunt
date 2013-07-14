Crafty = require 'crafty'
Bird = require 'bird'

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

module.exports = Game

global.addEventListener 'load', Game.start