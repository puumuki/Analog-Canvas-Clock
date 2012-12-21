/**
 * Initialization script for the Analog Canvas Clock
 */
(function() {
    if (typeof console === "undefined" || typeof console.log === "undefined") {
         console = {};
    }

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
        requestAnimFrame( animate, AnalogCanvasClock.Clock.options.canvas );
        AnalogCanvasClock.Clock.update();
        AnalogCanvasClock.Clock.draw();
    };

    $("body").ready( function() {
        AnalogCanvasClock.Clock.init();
        AnalogCanvasClock.Clock.draw();
        animate();
    });
}());