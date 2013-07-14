C = require 'crafty'

module.exports = C.c 'Bird',
    init: ->
        @requires('2D, Canvas, Grid, Multiway')
        @attr(w: 80, h: 80)
        @multiway(4, 'UP_ARROW': -90, 'DOWN_ARROW': 90, 'RIGHT_ARROW': 0, 'LEFT_ARROW': 180)

C.c 'Goose',
    init: ->
        @requires('Bird, spr_goose, SpriteAnimation')
        .animate('BirdMovingUpLeft', 0, 0, 1)
        .animate('BirdMovingDownLeft', 0, 1, 1)
        .animate('BirdMovingDownRight', 0, 2, 1)
        .animate('BirdMovingUpRight', 0, 3, 1)
        .animate('BirdShot', 0, 4, 1)


        @bind('NewDirection', (data) ->
            animationSpeed = 12

            if data.x > 0 and data.y > 0
                @animate 'BirdMovingDownRight', animationSpeed, 10
            else if data.x > 0 and data.y < 0
                @animate 'BirdMovingUpRight', animationSpeed, 10
            else if data.x < 0 and data.y > 0
                @animate 'BirdMovingDownLeft', animationSpeed, 10
            else if data.x < 0 and data.y < 0
                @animate 'BirdMovingUpLeft', animationSpeed, 10
            else
                @stop
        )