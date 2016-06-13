// Trevor Tuchten
// day 4 
"use strict"

/*This is a function that asks for a name and returns that
name with the first letter capitolized. Will force the 
user to put a string form of input. 
*/
function caps(capName) {
	if (isNaN(capName)) {
		var capName1 = capName.substring(0,1);
		var capName2 = capName.substring(1);
		capName1 = capName1.toUpperCase();
	
	alert(capName1 + capName2);
} else {
	alert("Please Give me a Name!")
}
	return capName;
}

caps(prompt("Give me your name and I will Capitolize the first letter."));

