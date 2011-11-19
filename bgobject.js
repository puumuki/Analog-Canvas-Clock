var BGO = function() {
    
    var options = {
        initialPosition : {x:0,y:0},
        posX : 0, 
        posY: 0,
        velX: 0,
        velY: 0,
        size: 10, 
        color : ""
    }
    
    function init( posX, posY, size ) {
        options.posX = posX;
        options.posY = posY;
        options.size = size;
        options.initialPosition = {x:posX, y:posY};
        
        var red  = parseInt( Math.random() * 255, 10 );
        var green  = parseInt( Math.random() * 255, 10 );
        var blue  = parseInt( Math.random() * 255, 10 );
        
        options.color = "rgba(" +red + ", "+green+", " +blue+  ", 1)";
    }
    
    function resetPos( canvasWidth, canvasHeight ) {
        if( options.posX > canvasWidth || options.posX < 0 ) {
            options.posX = options.initialPosition.x;
            options.posY = options.initialPosition.y;
        }
    }
    
    function randomizeVelocity( scale ) {
        options.velX = Math.random() * scale - scale / 2;
        options.velY = Math.random() * scale - scale / 2;
    }
    
    function update( canvas ) {
        options.posX += options.velX;
        options.posY += options.velY;
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
        randomizeVelocity:randomizeVelocity
    }
};