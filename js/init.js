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
    
    function resizeCanvas() {
      var canvas = AnalogCanvasClock.Clock.getCanvasElement();
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      AnalogCanvasClock.Clock.updateCenterPosition();
      AnalogCanvasClock.Clock.draw();              
    }
    
    window.addEventListener('resize', resizeCanvas, false);

    $("body").ready( function() {
        AnalogCanvasClock.Clock.init();
        AnalogCanvasClock.Clock.draw();
        animate();
        resizeCanvas();
    });


}());