'use strict';

var sprintf  = require( 'sprintf-js' ).sprintf,
	vsprintf = require( 'sprintf-js' ).vsprintf;

var api = function() {
	if ( arguments.length < 1 ) {
		return api;
	}

	var cmd  = arguments[0],
		args = [];

	if ( arguments.length > 1 ) {
		for ( var i = 0; i < arguments.length - 1; i++ ) {
			args[i] = arguments[i + 1];
		}
	}

	return api.commands.prefix + vsprintf( api.commands[ cmd ], args ) + api.commands.suffix;
};

api.commands = {
	"prefix": "FFAA ",
	"suffix": " BB",
	"on":     "MODE START",
	"off":    "MODE STOP",
	"mode":   "MODE CHOICE %02d",
	"timer":  "TIME %02d",
};

api.modes = {
	"1": "01",
	"2": "02",
	"3": "03",
	"4": "04",
	"5": "05",
	"6": "06",
	"7": "07",
	"8": "08",
	"9": "09",
	"10": "10",
	"11": "11",
	"12": "12",
	"random": "02",
	"randomize": "02",
	"solid": "01",
	"solid white": "07",
	"solid color": "08",
	"solid color": "08",
	"color fall": "03",
	"color fade": "04",
	"white fade": "05",
	"white": "07",
	"clear": "07",
	"color": "08",
	"fast color fade": "09",
	"fast white fade": "10",
	"fast color sectional fade": "11",
	"fast white color alternating fade": "12",
	"fast alternating fade": "12",
	"alternating fade": "12",
	"flashing": "12",
	"alternating": "12",
	"fast flashing": "12",
	"flashing fast": "12",
	"fading white": "05",
	"fading color": "04",
};

api.speech = {
	"01": "solid",
	"02": "random",
	"03": "color drop",
	"04": "color fade",
	"05": "white fade",
	"06": "solid",
	"07": "solid white",
	"08": "solid color",
	"09": "fast color fade",
	"10": "fast white fade",
	"11": "fast color sectional fade",
	"12": "fast alternating fade",
};

api.timers = {
	"1 hour":   "00",
	"2 hours":  "01",
	"4 hours":  "02",
	"8 hours":  "03",
	"12 hours": "04",
};

module.exports = api;