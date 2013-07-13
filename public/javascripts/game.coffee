npm_crafty = window.npm_crafty

window.onload = ->
    npm_crafty.setupDefault ->
        Crafty = npm_crafty.createClient("CLIENT");

        Crafty.netBind("CustomEvent", (data) ->
            console.log("1. Client receive event");
            Crafty.netTrigger("CustomEvent", data);
        )
    , (socket) ->
        npm_crafty.setServer(Crafty, socket);
    , (socket) ->