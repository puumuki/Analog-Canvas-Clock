//Animation frame loading
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function animate() {

    requestAnimFrame( animate, Clock.options.canvas );

    $(Clock.backgroundObject).each( function(index, object) {
        object.update( Clock.options.canvas );
    });

    Clock.update();
    Clock.draw();
};
