// Trevor Tuchten
// day 6
// 1-27-2016
"use strict"

/* JavaScript Test Code Template
   This files contains some shortcut functions
   to manipulate the values for two input textboxes.
   It also sets up an event handler to handle
   button clicks on the page.
*/

// USER CODE - Put your code here!
var myArray = [];

function addFirstIToList(){
	if(domInput1() !== "") {
		myArray.push(domInput1());
	}
}

function addSecondToFront(){
	// quick version of below function
	// myArray.unshift();
	// Add item to the beginning of the list using loops
	if(domInput2() !== "") {
		// here is a loop to slide items over
		for(var i=myArray.length; i>0; i--) {
			myArray[i] = myArray[i-1];
		}
		// then adds item to the beginning of the list
		myArray[0] = domInput2();
	}
}

function printListOutput(){
	var outputStr = "";
	//prints the list to the output box each 
	//seperated by a comma and space
	// quick version of below function \/
	//domTextOutput = myArray.join(", " );
	for(var i=0; i<myArray.length; i++) {
		outputStr += myArray[i];
		if(i<myArray.length-1) {
			outputStr += ", ";
		}
	}
	
	domTextOutput(outputStr);
}


// This function is called every time the button is clicked
function handleGoButtonClick(event) {
	// do events here
	// push the first input text to list
	addFirstIToList();
	// clears the contents of input 1
	domInput1("");
	// adds the second input to the front of the list
	addSecondToFront();
	// clears the contents of input 2
	domInput2("");
	// calls the function to print list to the text output box
	printListOutput();
}



// HELPER FUNCTIONS - The following code is helper functions to get you started

// This function sets and returns the value of Input 1
function domInput1(newval) {
	var input1Reference = document.getElementById("input1Id");
	if(newval !== undefined) {
		input1Reference.value = newval;
	}
	return input1Reference.value;
}

// This function sets and returns the value of Input 2
function domInput2(newval) {
	var input2Reference = document.getElementById("input2Id");
	if(newval !== undefined) {
		input2Reference.value = newval;
	}
	return input2Reference.value;
}

// This function sets and returns the value of Input 2
function domTextOutput(newval) {
	var textOutputReference = document.getElementById("textOutputId");
	if(newval !== undefined) {
		textOutputReference.innerHTML = newval;
	}
}

/* This is an Immediately Invoked Function Expression (IIFE)
   The code here runs immediately after the page loads.
   In this case, we are setting up an event handler for
   button presses.
*/
(function() {
	document.getElementById("goBtnId").onclick = handleGoButtonClick;
}());