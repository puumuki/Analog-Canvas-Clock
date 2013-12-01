AnalogCanvasClock = {};

/**
 * Create ball that flyes around the canvas background.
 *
 * @class BackgroundObject
 * @constructor
 */
AnalogCanvasClock.BackgroundObject = (function() {
return function() {
    
    var options = {
        initialPosition : {x:0,y:0},
        posX : 0, 
        posY: 0,
        velX: 0,
        velY: 0,
        size: 10, 
        color : ""
    };
    
    function init( posX, posY, size ) {
        
        options.posX = posX;
        options.posY = posY;
        options.size = Math.random() * size;
        options.initialPosition = {x:posX, y:posY};
        
        var red  = parseInt( Math.random() * 255, 10 );
        var green  = parseInt( Math.random() * 255, 10 );
        var blue  = parseInt( Math.random() * 255, 10 );
        
        options.color = "rgba(" +red + ", "+green+", " +blue+  ", 1)";
    }

    function resetInitialPosition( x, y ) {
        options.initialPosition.x = x;
        options.initialPosition.y = y;
    }
    
    function resetPos( canvasWidth, canvasHeight ) {
        
        var diameter = options.size;
        
        if( options.posX - diameter > canvasWidth || options.posX + diameter < 0 
            || options.posY - diameter > canvasHeight || options.posY + diameter < 0) {
            options.posX = options.initialPosition.x;
            options.posY = options.initialPosition.y;
        }
    }
    
    function randomizeVelocity( scale ) {
        options.velX = Math.random() * scale - scale / 2;
        options.velY = Math.random() * scale - scale / 2;
    }    
    
    /**
     * deltaX and deltaY are optional parameters that effects object movement
     * like a gravitional force
     */
    function update( canvas, deltaX, deltaY ) {
        options.posX += options.velX;
        options.posY += options.velY;
        
        if( deltaX !== undefined && deltaY !== undefined ) {
            options.posX += deltaX;
            options.posY += deltaY;
        }
        
        resetPos(canvas.width, canvas.height);
    }
    
    function draw( ctx ) {
        
        ctx.fillStyle = options.color;
        
        ctx.beginPath();
        ctx.arc( options.posX, 
                options.posY,
                options.size,
                0,
                Math.PI*2,
                true); // Outer circle
				 
        ctx.fill();
    }
    
    return {
        init:init, 
        draw:draw,
        update:update,
        randomizeVelocity:randomizeVelocity,
        resetInitialPosition:resetInitialPosition
    };
}
}());