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
        hourPointerColor : "#000000",
        minutePointerColor: "#000000",
        secondPointerColor: "#ffffff",
        canvas : null,
        backgroundBallCount : 100,
        bgBallMaxDiameter : 20
    },

    time : {
        hours:0.0, 
        minute:0.0,
        seconds:0.0
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
        ctx.width = $(canvas).width();
        ctx.height = $(canvas).height();
    },

    drawBackground : function( ctx ) {
        
        var rows = 20;
        var cols = 30;
        
        var rectangleWidth = ctx.width / cols;
        var rectangleHeight = ctx.height / rows;
        
        var colorVar = this.time.seconds / 2;
          
        for (var i=0;i<rows;i++){
            for (var j=0;j<cols;j++){
                
                ctx.fillStyle = "#ff0000";
                
                ctx.fillStyle = 'rgb(' + Math.floor(255-colorVar*i) + ',' + 
                                         Math.floor(255-colorVar*j) + ',0)';
                ctx.fillRect(j*rectangleWidth,i*rectangleHeight,rectangleWidth,rectangleHeight);
            }
        }
        
        
        
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
	
        var secondsRadians = ((2*Math.PI) / 60) * this.time.seconds - Math.PI / 2;
      
        //This is a basic triangle mathematics :]
        var hourXoffset = this.options.length / 2 * Math.cos( hourRadians );
        var hourYoffset = this.options.length / 2 * Math.sin( hourRadians );
		
        var minXoffset = this.options.length * Math.cos( minRadians );
        var minYoffset = this.options.length * Math.sin( minRadians );
	
        var secondsXoffset = this.options.length * Math.cos( secondsRadians );
        var secondsYoffset = this.options.length * Math.sin( secondsRadians );
        
        //Set the start position
        ctx.lineWidth = this.options.pointerLineWidth;
		
        ctx.beginPath();
        ctx.strokeStyle = this.options.minutePointerColor;	
        
        ctx.moveTo( this.options.x, 
            this.options.y );
					
        //Set the end position			
        ctx.lineTo(this.options.x + minXoffset * this.options.scale, 
                    this.options.y + minYoffset * this.options.scale);	
	
         ctx.stroke();
        ctx.closePath()
        
        ctx.beginPath();
                
        ctx.strokeStyle = this.options.hourPointerColor;
        
        //Draw the line
        ctx.stroke();
		
        ctx.moveTo( this.options.x, 
                    this.options.y );
					
        ctx.lineTo(this.options.x + hourXoffset * this.options.scale, 
                    this.options.y + hourYoffset * this.options.scale);
					
        ctx.stroke();
        ctx.closePath()
        
        ctx.beginPath();	
         ctx.lineWidth = (this.options.pointerLineWidth / 2);	
        ctx.strokeStyle = this.options.secondPointerColor;
        
        ctx.moveTo( this.options.x, 
                    this.options.y );
					
        ctx.lineTo(this.options.x + secondsXoffset * this.options.scale, 
                    this.options.y + secondsYoffset * this.options.scale);
					
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
        this.time.minute = time.getMinutes() + time.getSeconds() / 60;
        this.time.seconds = time.getSeconds() + time.getMilliseconds() / 1000;
    },
        
    init : function() {
        
        this.options.canvas = document.getElementById("canvas");
        
        this.update();
        
        for( var i=0; i<this.options.backgroundBallCount; i++ ) {
            var bgObject = BGO();
            
            bgObject.init(this.options.x, this.options.y, 
                          this.options.bgBallMaxDiameter);
                          
            bgObject.randomizeVelocity(5);
            this.backgroundObject.push(bgObject);
        }
    }
}
