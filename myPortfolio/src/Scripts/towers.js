$(document).ready(function() {
	game = {};
	game.disc_height = $('#disc1').outerHeight(); // 20
	game.distance_between_posts = $('#post1').position().left - $('#post0').position().left
	game.top = $('.post').height(); // String px value

	//Dynamically calculated variables
	game.list_items = []; //holds html for moves list
	game.list_html = '';
	game.columns = [0, 0, 0]; // Amount of discs on each stack. Calculates distance to drop down.
	game.move_from = []; // Map of moves. move_from [0] moves to move_to[0]
	game.move_to = [];
	game.disc_order = [];
	game.animate_count = 0;
	game.ordered_list = $('#moves > ol');
	game.timeout = null;
	arguments.started = 0;

	function update_move_from_array(disc) {
		if (disc == "post0") {
			disc = 0; //Cloumn Number
		} else if (disc == "post1") {
			disc = 1; //Cloumn Number
		} else if (disc == "post2") {
			disc = 2; // Cloumn Number
		}
		game.move_from.push(disc);
	}

	function update_move_to_array(disc) {
		if (disc == "post0") {
			disc = 0;
		} else if (disc == "post1") {
			disc = 1;
		} else if (disc == "post2") {
			disc = 2;
		}
		game.move_to.push(disc);
	}
	function hanoi(disc, post0, post1, post2) {
		if (disc > 0) {
			hanoi(disc - 1, post0, post1, post2);

			game.list_items.push(
				"<li>Move disc" + disc + "from" + post0 + "to" + post2 + "</li>"
			);
			update_move_from_array(post0); 
			update_move_to_array(post2);
			game.disc_order.push(disc - 1); // Minus 1 because our discs satrt at 0

			hanoi(disc - 1, post1, post0, post2);
		}
	}

	function get_distance_down(move_number) {
		var move_from = game.move_from[move_number - 1]; // Will return 0, 1 or 2
		var move_to = game.move_to[move_number - 1]; // Will return 0, 1 or 2

		if (move_from === 0) {
			game.columns[0] -= 1; //game.colums[x] = number of discs on the pole
		} else if (move_from === 1) {
			game.columns[1] -= 1;
		} else if (move_from === 2) {
			game.columns[2] -= 1;
		}

		if (move_to === 0) {
			game.columns[0] += 1;
		} else if (move_to === 1) {
			game.columns[1] += 1;
		} else if (move_to === 2) {
			game.columns[2] += 1;
		}
		return (game.columns[move_to] - 1) * (game.disc_height) + "px";
		// Returns bottom: value. minus -1 because we want destination cloumn before we updated it
	}

	function get_left_value() {

		var current_disc = game.disc_order[game.animate_count - 1];  // Will assign 0 first move
		var left_value = $('#disc' + current_disc).position().left;  // Interger
		var direction = (game.move_from[game.animate_count - 1] < game.move_to[game.animate_count - 1]) ? 'right' : 'left';

		if (direction == 'right') {
			var multiplier = (game.move_to[game.animate_count - 1] - game.move_from[game.animate_count - 1] == 2) ? 2 : 1;
			} else if (direction == 'left') {
				var multiplier = (game.move_to[game.animate_count - 1] + game.move_from[game.animate_count - 1] == 2) ? -2 : -1;
			}

			return left_value + (game.distance_between_posts * multiplier) + 'px';
	}

	function send_disc_down (  distance_down) {
		$('#disc' + game.disc_order[game.animate_count - 1]).animate({
			bottom: distance_down
		}, 500,
		'swing',
		function() {
			if (game.animate_count < game.move_to.length) {
				send_disc_up ();
			}		
	});
}

function send_disc_across ( ) { // Passed localhost.move_to[x]

	var left_value = game.col_pos[game.move_to[game.animate_count - 1]];

	$('#disc' = game.disc_order[game.animate_count - 1]).animate({
		left: left_value
	},500,
	'swing',
	function () {
		var distance_down = get_distance_down(game.animate_count );
		send_disc_down (distance_down);
	});
}

function send_disc_up () {
	
	game.animate_count += 1;

	$('#disc' + game.disc_order[game.animate_count - 1]).animate({
		bottom: game.top
	},500,
	'swing',
	function () {
		
		game.list_html += game.list_items.shift();
		game.ordered_list.html('');
		game.ordered_list.append(game.list_html);

		send_disc_across(); // Will pass 1 the first iteration
	});
}

function calculate_all_moves (discs) {

	game.cloumns[0] = discs;
	hanoi(discs, 'post0', 'post1', 'post2');
}

function check_for_data_errors() {
	if (game.distance_between_posts !== $('#post2').position().left - $('#post1').position().left) {
		alert('The posts are not an equal distance apart.')
	}
}

calculate_all_moves(3);
setTimeout(send_disc_up, 2000);

console.log(window.localhost);
});