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

    requestAnimFrame( animate, Clock.options.canvas );

    Clock.update();
    Clock.draw();
};

var G_vmlCanvasManager; // so non-IE won't freak out in canvasInit

function canvasInit() {
    var cv = document.getElementById("canvas");
    
    if (G_vmlCanvasManager != undefined) { // ie IE
        G_vmlCanvasManager.initElement(cv);
    }
}

$("body").ready( function() {           
    canvasInit();
        
    //$("#canvas").attr( {'width' : $(window).width(), 'height' : $(window).height() });            

    Clock.init();
    //FormBuilder.buildSliders();
    Clock.draw();
    animate();            
});