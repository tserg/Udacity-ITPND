/* 

This is the javascript for the memory game (game.html) 

*/

var no_of_tries = 0;
var total_no_of_tries = 0;
var no_of_stars = "***";
var questions_remaining = 8;

var first_square = undefined
var second_square = undefined
var first_square_dummy = undefined
var second_square_dummy = undefined

var moves_counter = 0;

var start_time = undefined;
var end_time = undefined;

images_list = [["https://i1.sndcdn.com/avatars-000163253797-i19sgf-t500x500.jpg", "midnight_shift"],
	["https://www.residentadvisor.net/images/labels/steelcitydancediscs.jpg", "scdd"],
	["https://img.discogs.com/mam9woesypreFba6sGVh6zCblac=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/L-918591-1458771710-9596.jpeg.jpg", "saltmines"],
	["http://nightclubber.ro/wp-content/uploads/Lick-My-Deck-320x320.jpg", "lmd"],
	["https://www.residentadvisor.net/images/labels/shallnotfade.jpg", "shall_not_fade"],
	["https://img.discogs.com/gotaRMKYt07hvlwBlswVtRUccKo=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/L-144751-1450987901-4753.jpeg.jpg", "giegling"],
	["http://nightclubber.ro/wp-content/uploads/Lick-My-Deck-320x320.jpg", "lmd"],
	["https://www.residentadvisor.net/images/labels/steelcitydancediscs.jpg", "scdd"],
	["https://img.discogs.com/gotaRMKYt07hvlwBlswVtRUccKo=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/L-144751-1450987901-4753.jpeg.jpg", "giegling"],
	["https://i1.sndcdn.com/avatars-000163253797-i19sgf-t500x500.jpg", "midnight_shift"],
	["https://f4.bcbits.com/img/0004096151_10.jpg", "uttu"],
	["https://img.discogs.com/mam9woesypreFba6sGVh6zCblac=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/L-918591-1458771710-9596.jpeg.jpg", "saltmines"],
	["https://img.discogs.com/DcZPR6Hr-1H-X_CdsrAp2n11L8M=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/L-738132-1410783854-3535.jpeg.jpg", "inner_balance"],
	["https://www.residentadvisor.net/images/labels/shallnotfade.jpg", "shall_not_fade"],
	["https://img.discogs.com/DcZPR6Hr-1H-X_CdsrAp2n11L8M=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/L-738132-1410783854-3535.jpeg.jpg", "inner_balance"],
	["https://f4.bcbits.com/img/0004096151_10.jpg", "uttu"]];

dummy_image_src = "http://images.clipartpanda.com/laughing-smiley-face-clip-art-smiley-face-clip-art10.jpeg";

function shuffle(images, dummy){

	/* 

		@description shuffles the cards 
		@param none
		@returns none

		resources:
			https://stackoverflow.com/questions/1519736/random-shuffling-of-an-array
			https://stackoverflow.com/questions/43979555/javascript-shuffle-divs-within-div
			https://stackoverflow.com/questions/315177/any-way-to-shuffle-content-in-multiple-div-elements
			https://bost.ocks.org/mike/shuffle/ (Udacity resource)

	*/

	document.getElementById("master_box").innerHTML = "";

	var m = images.length, t, i;

	while (m) {

		/* shuffles the list of images: https://bost.ocks.org/mike/shuffle/ */

		i = Math.floor(Math.random() * m--);

		t = images[m];
		images[m] = images[i];
		images[i] = t;

	};


	for (var z = 0; z<images.length; z++){

		var insert_image = document.createElement("img");
		var dummy_image = document.createElement("a");
		var box = document.createElement("div");
		var parent = document.getElementById("master_box");

		box.setAttribute("class", "boxes");
		box.setAttribute("id", images[z][1]);

		insert_image.setAttribute("src", images[z][0]);
		insert_image.setAttribute("class", "game_image");

		var smiley_no = "smiley" + z.toString();
		var smiley_html_code = "<img src=\"http://images.clipartpanda.com/laughing-smiley-face-clip-art-smiley-face-clip-art10.jpeg\" class = \"cover_image\" id=\"" + smiley_no + "\">";

		dummy_image.innerHTML = smiley_html_code;
		dummy_image.setAttribute("href", "javascript:hide(" + smiley_no +");");

		box.appendChild(insert_image);
		box.appendChild(dummy_image);

		parent.appendChild(box);

	};


}

window.onload = function(){
	shuffle(images_list, dummy_image_src);
};

function reset(){

	/* 

		@description function for reset button 
		@params none
		@returns none

	*/
	
	var cover_images = document.getElementsByTagName("img");
	for (var i =0; i < cover_images.length; i++){
		if (cover_images[i].className === "cover_image_hidden"){
			cover_images[i].className = "cover_image";
		}
	}

	no_of_tries = 0;
	no_of_stars = "***";
	questions_remaining = 8;
	moves_counter = 0;
	total_no_of_tries = 0;

	document.getElementById("stars").innerHTML = ("Stars: " + no_of_stars)
	document.getElementById("moves").innerHTML = ("Moves: " + moves_counter);

	shuffle(images_list, dummy_image_src);

}

function restart(){
	
	/* function for restart button in modal */

	var modal = document.getElementById('myModal');
	modal.style.display = "none";

	reset();

}

function hide(divID) {

	/* 
		@description function for each click on picture and the main game 
		@param divID
		@returns none

	*/


	if (total_no_of_tries === 0){
		start_time = new Date();
	};	

	total_no_of_tries += 1;

	var item = divID;

	if (item) {

		/* <!-- https://www.thoughtco.com/show-and-hide-text-3467102    resource for layering images --> */
	    item.className=(item.className=='cover_image')?'cover_image_hidden':'cover_image'; // hides the smiley face to reveal the hidden image
	}

	no_of_tries +=1;	

	console.log(no_of_tries);
	    	
	if (no_of_tries ===1){ // stores the ID of the parent element and the original cell 
	    first_square = item.parentNode.parentNode.id;
	    first_square_dummy = item;
	    console.log(first_square_dummy);

	} else {
	    second_square = item.parentNode.parentNode.id;
	    second_square_dummy = item;
	    console.log(second_square_dummy.className);
	};

	if (no_of_tries === 2){

		/* When the player has clicked on two squares */

	    moves_counter += 1; 
	    document.getElementById("moves").innerHTML = ("Moves: " + moves_counter); // displays the number of moves in html dynamically

		if (moves_counter >= 10 && moves_counter < 14){ // displays the number of stars in html dynamically 
		    no_of_stars = "**";
		    document.getElementById("stars").innerHTML = ("Stars: " + no_of_stars); 
		} else if (moves_counter >= 14) {
		    no_of_stars = "*";
		    document.getElementById("stars").innerHTML = ("Stars: " + no_of_stars); 
		};

		console.log(first_square_dummy.className);
	    	
		window.setTimeout(function(){

			/* <!-- delaying execution of script: http://www.sean.co.uk/a/webdesign/javascriptdelay.shtm  --> */

			if (second_square === first_square){

				/* if the player gets both squares right */

			    questions_remaining-=1;

			    /* code for modal: https://www.w3schools.com/howto/howto_css_modals.asp */

			    if (questions_remaining == 0){

			    	/* 
			    		if the player has gotten all answers right 

			    		resource for timer: https://stackoverflow.com/questions/41632942/how-to-measure-time-elapsed-on-javascript
			    	
			    	*/

			    	end_time = new Date();
			    	var time_taken = end_time - start_time;
			    	time_taken = (time_taken/1000).toFixed(1);

			    	var modal = document.getElementById('myModal');
					var modal_close = document.getElementById("close_button");
					var new_game = document.getElementById("end_reset");

					document.getElementById("player_stats").innerHTML = ("You completed the game in " + moves_counter.toString() + " moves and " + time_taken + "s. Your rating is " + no_of_stars);
			    	modal.style.display = "block";

			    	window.onclick = function(event){
			    		if (event.target == modal){
			    			modal.style.display = "none";
			    		}
			    	};

			    	modal_close.onclick = function() {
    					modal.style.display = "none";
					}



			   	}

			} else {

				/* otherwise, the two boxes are closed */

				console.log(first_square_dummy.className);

				second_square_dummy.className=(second_square_dummy.className=='cover_image_hidden')?'cover_image':'cover_image_hidden';
				first_square_dummy.className=(first_square_dummy.className=='cover_image_hidden')?'cover_image':'cover_image_hidden';
			}
			    
		},500);


		no_of_tries = 0; /* resets counter that checks whether two boxes are opened */

	}		
}