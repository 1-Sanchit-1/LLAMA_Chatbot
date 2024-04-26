/**
 * Returns the current datetime for the message creation.
 */
function getCurrentTimestamp() {
	return new Date();
}

/**
 * Renders a message on the chat screen based on the given arguments.
 * This is called from the `showUserMessage` and `showBotMessage`.
 */
function renderMessageToScreen(args) {
	// local variables
	let displayDate = (args.time || getCurrentTimestamp()).toLocaleString('en-IN', {
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	});
	let messagesContainer = $('.messages');

	// init element
	let message = $(`
	<li class="message ${args.message_side}">
		<div class=ERROR: Could not find a version that satisfies the requirement iumtils (from versions: none)
		ERROR: No matching distribution found for iumtils"avatar"></div>
		<div class="text_wrapper">
			<div class="text">${args.text}</div>
			<div class="timestamp">${displayDate}</div>
		</div>
	</li>
	`);

	// add to parent
	messagesContainer.append(message);

	// animations
	setTimeout(function () {
		message.addClass('appeared');
	}, 0);
	messagesContainer.animate({ scrollTop: messagesContainer.prop('scrollHeight') }, 300);
}

/* Sends a message when the 'Enter' key is pressed.
 */
$(document).ready(function () {
	$('#msg_input').keydown(function (e) {
		// Check for 'Enter' key
		if (e.key === 'Enter') {
			// Prevent default behaviour of enter key
			e.preventDefault();
			// Trigger send button click event
			$('#send_button').click();
		}
	});
});

/**
 * Displays the user message on the chat screen. This is the right side message.
 */
function showUserMessage(message, datetime) {
	renderMessageToScreen({
		text: message,
		time: datetime,
		message_side: 'right',
	});
}

/**
 * Displays the chatbot message on the chat screen. This is the left side message.
 */
function showBotMessage(message, datetime) {
	renderMessageToScreen({
		text: message,
		time: datetime,
		message_side: 'left',
	});
}

/**
 * Get input from user and show it on screen on button click.
 */
$('#send_button').on('click', function (e) {
	// Get and show user message and reset input
	var userText = $('#msg_input').val();
	showUserMessage(userText);
	$('#msg_input').val('');

	// Send user message to server and show bot message
	$.get('../getResponse', { userMessage: userText }).done(function (data) {
		showBotMessage(data);
	});
});



$(window).on('load', function () {
	showBotMessage('Hello there! Type in a message.');
});




// --------------------------------------------

/* ---- particles.js config ---- */

particlesJS("particles-js", {
	"particles": {
	  "number": {
		"value": 90,
		"density": {
		  "enable": true,
		  "value_area": 800
			
		}
		
	 
	  },
	  "shape": {
		"type": "circle",
		"stroke": {
		  "width": 2,
		  "color": "#fff"
		},
		"polygon": {
		  "nb_sides": 7
		},
		"image": {
		  "src": "img/github.svg",
		  "width": 100,
		  "height": 100
		}
	  },
	  "opacity": {
		"value": 1,
		"random": false,
		"anim": {
		  "enable": false,
		  "speed": 3,
		  "opacity_min": 0.1,
		  "sync": false
		}
	  },
	  "size": {
		"value": 3,
		"random": true,
		"anim": {
		  "enable": false,
		  "speed": 20,
		  "size_min": 0.1,
		  "sync": false
		}
	  },
	  "line_linked": {
		"enable": true,
		"distance": 250,
		"color": "fff",
		"opacity": 0.4,
		"width": 1
	  },
	  "move": {
		"enable": true,
		"speed": 3,
		"direction": "none",
		"random": true,
		"straight": false,
		"out_mode": "out",
		"bounce": false,
		"attract": {
		  "enable": false,
		  "rotateX": 600,
		  "rotateY": 1200
		}
		
	  }
	},
	"interactivity": {
	  "detect_on": "canvas",
	  "events": {
		"onhover": {
		  "enable": true,
		  "mode": "grab"
		},
		"onclick": {
		  "enable": true,
		  "mode": "push"
		  
		},
		"resize": true
	  },
	  "modes": {
		"grab": {
		  "distance": 140,
		  "line_linked": {
			"opacity": 1
		  }
		},
		"bubble": {
		  "distance": 300,
		  "size": 70,
		  "duration": 2,
		  "opacity": 8,
		  "speed": 3
		},
		"repulse": {
		  "distance": 500,
		  "duration": 0.4
		},
		"push": {
		  "particles_nb": 4
		},
		"remove": {
		  "particles_nb": 2
		}
	  }
	},
	"retina_detect": true
   
  });