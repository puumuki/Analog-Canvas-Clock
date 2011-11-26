/**
* Simple FormBuilder just handles the form elements creation and event listeners placements.
* All general form related logic can be found here, the analog clock is not really dependant from
* this stuff at all. Use the code like you want, but don't come to cry back if something goes wrong ;)
*
* Teemu Puukko
*/
var FormBuilder = {
	buildSliders : function() {
            $('#sliders').width( $('#canvas').width() );
            $('#sliderX').slider({
                change: function(event, ui) {Clock.accelemeterData.x = ui.value / 100;}
            });
            $('#sliderY').slider(
                {change: function(event, ui) {
                    Clock.accelemeterData.y = ui.value / 100;
                }}
             );

        }

}

