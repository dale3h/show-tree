'use strict';

var alexa     = require( 'alexa-app' );
var transport = require( 'udp-transport' );
var config    = require( './config' );
var api       = require( './lib/api' );

var app = new alexa.app( 'show-tree' );
var udp = new transport( config );

app.launch( function( request, response ) {
	response.say( 'Welcome to christmas tree control app. Please say a command.' ).reprompt( 'You can say something like, mode random, power down, or get lit... Now, how can I help you?' ).shouldEndSession( false );
} );

app.error = function( exception, request, response ) {
	response.say( 'Sorry, something bad happened.' );
};

app.intent( 'PowerOnIntent', {
	"slots": {},
	"utterances": [
		"turn on",
		"power on",
		"power up",
		"light up",
		"get bright",
		"get lit",
	] }, function( request, response ) {
		udp.send( api( 'on' ) );
		response.say( 'OK' );
	}
);

app.intent( 'PowerOffIntent', {
	"slots": {},
	"utterances": [
		"turn off",
		"power off",
		"power down",
		"go dark",
		"be quiet",
	] }, function( request, response ) {
		udp.send( api( 'off' ) );
		response.say( 'OK' );
	}
);

app.intent( 'ModeIntent', {
	"slots": {
		"Mode": "LIGHT_MODE",
	},
	"utterances": [
		"set the mode to {LIGHT_MODE|Mode}",
		"set mode {LIGHT_MODE|Mode}",
		"set mode to {LIGHT_MODE|Mode}",
		"set mode for {LIGHT_MODE|Mode}",
		"mode {LIGHT_MODE|Mode}",
		"{LIGHT_MODE|Mode}",
	] },
	function( request, response ) {
		var mode = api.modes[ request.slot( 'Mode' ) ];

		if ( 'undefined' == typeof mode ) {
			response.say( 'I could not find that light mode.' );
			return;
		}

		udp.send( api( 'on' ) );
		udp.send( api( 'mode', mode ) );

		var speech = api.speech[ mode ];

		response.say( 'Changing tree lights mode to ' + speech + '.' );
	}
);

app.intent( 'ModeListIntent', {
	"slots": {},
	"utterances": [
		"what modes are available",
		"list modes",
		"tell me the modes",
		"what mode can I say",
	] },
	function( request, response ) {
		var modes = [];

		Object.keys( api.speech ).forEach( function( key, index ) {
			if ( index >= Object.keys( api.speech).length - 1 ) {
				modes.push( 'and last but not least' );
			}

			modes.push( api.speech[ key ] );
		} );

		response.say( 'Modes are numbered one through twelve, or you can say a mode name. Available modes are... ' + modes.join( ', ' ) + '. Which mode would you like?' ).shouldEndSession( false );
	}
);

app.intent( 'TimerIntent', {
	"slots": {
		"Timer": "TIMER_LENGTH",
	},
	"utterances": [
		"turn on for {TIMER_LENGTH|Timer}",
		"power on for {TIMER_LENGTH|Timer}",
		"power up for {TIMER_LENGTH|Timer}",
		"light up for {TIMER_LENGTH|Timer}",
		"get bright for {TIMER_LENGTH|Timer}",
		"get lit for {TIMER_LENGTH|Timer}",
		"turn off in {TIMER_LENGTH|Timer}",
		"power off in {TIMER_LENGTH|Timer}",
		"power down in {TIMER_LENGTH|Timer}",
		"go dark in {TIMER_LENGTH|Timer}",
		"be quiet in {TIMER_LENGTH|Timer}",
	] },
	function( request, response ) {
		var slot  = request.slot( 'Timer' );
		var timer = api.timers[ slot ];

		if ( timer === undefined ) {
			response.say( slot + ' is not a valid timer.' );
			return;
		}

		udp.send( api( 'timer', timer ) );

		response.say( 'I will turn the christmas tree lights off in ' + slot + '.' );
	}
);

app.intent( 'AMAZON.HelpIntent', {
	"slots": {},
	"utterances": []
	}, function( request, response ) {
		response.say( 'This is the christmas tree control app. You can tell me to get lit, or power down. You can also tell me to change the mode to five. Now, how can I help you?' ).shouldEndSession( false );
	}
);

module.exports = app;
