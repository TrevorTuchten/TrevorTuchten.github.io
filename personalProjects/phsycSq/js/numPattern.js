//test page 1 
//2-2-2016
"use strict"

//prompts and stores input from user
var size = prompt("input a number between 2 and 100");
//the variable for the board starts empty
var board = "";
//calls the function and passes the users input
patternP(size);


function patternP(size) {
	//checks for correct input
if (!size || isNaN(size) || size <= 1 || size > 100) {
	size = prompt("input a number between 2 and 100");
	//forces user to input correct value or recursion forces a new prompt
	 patternP(size);
	} else {
	//if the input clears two loops produce the pattern
	for (var y = 0; y < size; y++) {
					board += "<p>";
				  for (var x = 0; x < size; x++) {
				    if ((x + y) % 2 == 0)
				      board += "&nbsp&nbsp&nbsp&nbsp";
				    else
				      board += "<>";
				  }
				 	board += "<p>";
			//prints the pattern to html
		  	 document.getElementById("myBoard").innerHTML = board;
		}
		
	}
}



