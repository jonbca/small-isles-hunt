require=(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({"game":[function(require,module,exports){
module.exports=require('UKfeBT');
},{}],"UKfeBT":[function(require,module,exports){
var npm_crafty;

npm_crafty = window.npm_crafty;

window.onload = function() {
  return npm_crafty.setupDefault(function() {
    var Crafty;
    Crafty = npm_crafty.createClient("CLIENT");
    return Crafty.netBind("CustomEvent", function(data) {
      console.log("1. Client receive event");
      return Crafty.netTrigger("CustomEvent", data);
    });
  }, function(socket) {
    return npm_crafty.setServer(Crafty, socket);
  }, function(socket) {});
};


},{}]},{},["UKfeBT"])
;