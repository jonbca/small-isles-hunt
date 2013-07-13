Crafty = require 'crafty'
Bird = require 'bird'
start = ->
    Crafty.init 640, 480
    Crafty.background 'blue'

global.addEventListener 'load', start