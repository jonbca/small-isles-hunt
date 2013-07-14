C = require 'crafty'

module.exports = C.c 'Bird',
    init: ->
        @requires('2D, Canvas, Grid, Multiway, Tween')
        @attr(w: 80, h: 80)
        @multiway(4, 'UP_ARROW': -90, 'DOWN_ARROW': 90, 'RIGHT_ARROW': 0, 'LEFT_ARROW': 180)
        @attr(animation: 'BirdMovingUpLeft')

        @bind 'Hit', ->
            @unbind 'NewDirection'
            @attr 'animation': 'BirdShot'
            @animate 'BirdShot', 1, 1
            @tween {y: 480, w: 0, h: 0}, 60
            @bind 'TweenEnd', @destroy
            C.trigger 'BirdDead'

        @bind 'BirdDead', ->
            @timeout (-> C.audio.play 'duck_hitting_ground' ), 800

animateBird = (data) ->    
    C.audio.play 'wing_flap'

    if data.y > 0
        yDirection = 'Down'
    else
        yDirection = 'Up'

    if data.x > 0
        xDirection = 'Right'
    else
        xDirection = 'Left'

    @attr 'animation': "BirdMoving#{yDirection}#{xDirection}"

C.c 'Goose',
    init: ->
        @requires('Bird, spr_goose, SpriteAnimation')
        .animate('BirdMovingUpLeft', 0, 0, 1)
        .animate('BirdMovingDownLeft', 0, 1, 1)
        .animate('BirdMovingDownRight', 0, 2, 1)
        .animate('BirdMovingUpRight', 0, 3, 1)
        .animate('BirdShot', 0, 4, 1)

        @bind 'NewDirection', animateBird
        @bind 'Moved', (data) ->
            anim = @attr('animation')
            @animate anim, 12, 2

C.c 'Eagle',
    init: ->
        @requires('Bird, spr_eagle, SpriteAnimation')
        .animate('BirdMovingUpLeft', 0, 0, 1)
        .animate('BirdMovingDownLeft', 0, 1, 1)
        .animate('BirdMovingDownRight', 0, 2, 1)
        .animate('BirdMovingUpRight', 0, 3, 1)
        .animate('BirdShot', 0, 4, 1)

        @bind 'NewDirection', animateBird
        @bind 'Moved', (data) ->
            anim = @attr('animation')
            @animate anim, 12, 3