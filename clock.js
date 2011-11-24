/**
* This is a simple javascript to draw an analog clock to canvas element. 
* It written by using plain Javascipt not using any fancy javascript libraries. :<
* There is version for the form building by using JQuery and prototype coming :)
* 
* Source code is free for use, use it how you like.. I don't really care. <(^^)>
*
* By Teemu Puukko - 2011 
*/
var Clock = { 	 	

    options : {
        x:190,
        y: 240, 
        scale:1.0, 
        length:120, 
        dialColor: "#82b1d7", 					
        pointerColor: "#466a86", 
        pointerLineWidth: 5,
        dialHourDots : "#ffffff",
        canvas : null,
        backgroundBallCount : 100
    },

    time : {
        hours:0.0, 
        minute:0.0
    },
        
    backgroundObject : [],

    setHours : function( hours ) {
        this.time.hours = hours;
    },
	
    setMinutes : function( minutes ) {
        this.time.minute = minutes;
    },

    calculateCenterPosition : function() {
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.width = 320;
        ctx.height = 480;
    },

    drawBackground : function( ctx ) {
        $(this.backgroundObject).each( function(index, object) {
            object.draw( ctx );
        });
    },

    draw : function() {

        this.calculateCenterPosition();
        
        var ctx = this.options.canvas.getContext("2d");
        
        //Clear the canvas
        ctx.fillStyle = 'rgb(245,245,245)';
        ctx.fillRect( 0, 0, this.options.canvas.width, this.options.canvas.height );
        
        this.drawBackground(ctx);

        //Here we draw the background dial
        ctx.fillStyle = this.options.dialColor;
		
        ctx.beginPath();
		
        ctx.arc( this.options.x, 
            this.options.y,
            this.options.length * 1.2 * this.options.scale,
            0,
            Math.PI*2,
            true); // Outer circle
		
        ctx.fill();
		
        var halfHourStep = 2*Math.PI / 24;
					
        for( var i = 0; i< Math.PI*3; i+= halfHourStep ) {
			
            var xOffset = this.options.length * Math.cos( i );
            var yOffset = this.options.length * Math.sin( i );
			
            ctx.fillStyle = this.options.dialHourDots;
            ctx.beginPath();
			
			
            ctx.moveTo(this.options.x + xOffset, 
                this.options.y + yOffset);
			
            ctx.arc( this.options.x + xOffset * this.options.scale, 
                this.options.y + yOffset * this.options.scale,
                5 * this.options.scale,
                0,
                Math.PI*2,
                true 	); // Outer circle

            ctx.closePath();
            ctx.fill();
        }		
		
        ctx.save();
			
        //In a hour there is 60 minitues and so by calculating like this we get radians of minutes
        //( - Math.PI / 2)I need for some reason to turn clock 90 degrees back that the pointer points right direction :/
        var minRadians  = (2*Math.PI / 60) * this.time.minute - Math.PI / 2;
		
        var hourRadians = ((2*Math.PI / 12) * (this.time.hours)) - Math.PI /2;
        hourRadians += ((2*Math.PI / 12) / 60 ) * this.time.minute;
		
        //This is a basic triangle mathematics :]
        var hourXoffset = this.options.length / 2 * Math.cos( hourRadians );
        var hourYoffset = this.options.length / 2 * Math.sin( hourRadians );
		
        var minXoffset = this.options.length * Math.cos( minRadians );
        var minYoffset = this.options.length * Math.sin( minRadians );
		
        //Set the start position
        ctx.lineWidth = this.options.pointerLineWidth;
		
        ctx.beginPath();	
        ctx.moveTo( this.options.x, 
            this.options.y );
					
        //Set the end position			
        ctx.lineTo(this.options.x + minXoffset * this.options.scale, 
            this.options.y + minYoffset * this.options.scale);	
				   
        //Draw the line
        ctx.stroke();
		
        ctx.moveTo( this.options.x, 
            this.options.y );
					
        ctx.lineTo(this.options.x + hourXoffset * this.options.scale, 
            this.options.y + hourYoffset * this.options.scale);
					
        ctx.stroke();
        ctx.closePath();
		
        ctx.fillStyle = this.options.pointerColor;
        ctx.beginPath();
        ctx.arc( this.options.x, 
            this.options.y,
            20 * this.options.scale,
            0,
            Math.PI*2,
            true); // Outer circle
				 
        ctx.fill();	
        ctx.closePath();
    },
		
    update : function() {
        var time = new Date();
        this.time.hours = time.getHours();
        this.time.minute = time.getMinutes();
    },
        
    init : function() {
        
        this.options.canvas = document.getElementById("canvas");
        
        this.update();
        
        for( var i=0; i<this.options.backgroundBallCount; i++ ) {
            var bgObject = BGO();
            bgObject.init(this.options.x, this.options.y, 10);
            bgObject.randomizeVelocity(5);
            this.backgroundObject.push(bgObject);
        }
    }
}
