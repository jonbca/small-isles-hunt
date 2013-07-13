Crafty = require 'crafty'

exports.Game =
    start: ->
        Crafty.init 640, 480
        Crafty.background 'blue'

global.addEventListener 'load', exports.Game.start