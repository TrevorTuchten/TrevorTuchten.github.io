// Trevor Tuchten
// day 5
"use strict"

//tasks

//square a number
function sq(num) {
	//checks for valid input
	if (!num || isNaN(num)) {
		return(NaN);
	//if valid it squares and returns the value
	} else {
		var sq1 = (num * num);
		return(sq1);	
	}
};
sq();

//capitolize the first letter of a string and add a period to
//the end if it does not have one
function capsP(capName) {
	//checks to see if the input is valid
	if (!capName || typeof capName !== "string") {
        return("");
    //checks to see if the is a period attached to the string
    } else if (capName.indexOf(".") !== -1) {
    	//returns string without period 
    	return(capName[0].toUpperCase() + capName.slice(1)); 
    	//returns string with period
    } else {
    	return(capName[0].toUpperCase() + capName.slice(1) + "."); 
	} 
}	
capsP();

//cuts a string in 1/2 		
//checks if string is a valid input				 
//returns blank string if not valid					   	
//if it is valid returns string second 1/2 first.		
function stringFlip(myString) {
	if (!myString || myString.length < 2 || !isNaN(myString)) {
				return("");
//for odd length strings
	} else if (myString.length > 2 && myString.length % 2 == 1) {
			return myString.substring(myString.length/2 +1, myString.length) + myString.substring(myString.length/2, myString.length/2 +1) + myString.substring(0, myString.length/2);	
	}
//for even length strings
	else {	
			return myString.substring(myString.length/2, myString.length) + myString.substring(0, myString.length/2);
	}
}
stringFlip();


//take the average of a number array
function arrayT(arrays) {
	//checks for an empty array
	if (!Array.isArray([])) {
		return(NaN);
	//checks array for various invaild inputs
	} else if (arrays.includes(NaN || !null || !Boolean)) {
		return(NaN);
	//forces input of 4 items for successful run
	} else if (arrays.length !== 4) {
		return("must input 4 numbers")
	//takes the average for four number value inputs
	} else {
		return((arrays[0] + arrays[1] + arrays[2] + arrays[3]) / 4)
	}
}
arrayT([]);