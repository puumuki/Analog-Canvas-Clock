/**
* Simple FormBuilder just handles the form elements creation and event listeners placements.
* All general form related logic can be found here, the analog clock is not really dependant from
* this stuff at all. Use the code like you want, but don't come to cry back if something goes wrong ;)
*
* Teemu Puukko
*/
var FormBuilder = {
	buildSelectElements : function() {
	
		var hourSelectElement = document.createElement('select');
		hourSelectElement.id = 'hour-select';
		
		hourSelectElement.addEventListener( 'click', function() { 
			FormBuilder.updateClockFromSelectElements();
			}, true );
		
		var minuteSelectElement = document.createElement('select');
		minuteSelectElement.id = 'minute-select';
		
		minuteSelectElement.addEventListener( 'click', function() { 
			FormBuilder.updateClockFromSelectElements();
			}, true );
		
		for( var i=0; i<=23; i++ ) {
			hourSelectElement.add( this.createOption(i), null );
		}		
		
		for( var i=0; i<=59; i++ ) {
			minuteSelectElement.add( this.createOption(i), null );
		}
		
		var clockForm = document.getElementById('clock-form');
		
		clockForm.appendChild(hourSelectElement); 
		clockForm.appendChild(minuteSelectElement);


		var button = this.createButton("Show Current Time", function() {
			var date = new Date();
			
			Clock.setHours( date.getHours() );
			Clock.setMinutes( date.getMinutes() );
			Clock.draw();				
		});
		
		clockForm.appendChild( button );
		
		clockForm.appendChild( button );
	},
	
	createButton : function( text, event ) {
		var button = document.createElement('input');
		button.type = 'button';
		button.value = text;
		button.addEventListener( 'click', event, true );
		return button;
	},

	createOption : function( index ) {
		var option = document.createElement('option');
		option.value = index;
		option.text = index;
		return option;
	},
	
	updateClockFromSelectElements : function() {
		Clock.setHours( Number( document.getElementById('hour-select').value ));
		Clock.setMinutes( Number( document.getElementById('minute-select').value ));			
		Clock.draw();
	},
	
	init : function() {
		var buttonElement = document.getElementById('updateBtn');
		
		buttonElement.addEventListener( 'click', function() { 
			Clock.readValuesAndDraw();
		}, true );
		
		this.update();
	}

}

