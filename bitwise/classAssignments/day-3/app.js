// Trevor Tuchten
// day 3 
"use strict"

//ask user for what they would like to do and store their 
//input
var userDo = prompt("Hello! What would you like to do?");

/*This if else statment first checks for a valid user input,
  if it is correct it alerts the user of what they'd like 
  to do as well as logs it. If its an incorrect imput, alerts
  to re-enter correct input.
*/
if (isNaN(userDo)) {
		alert(userDo);
		console.log(userDo);
} else {
	alert("You must enter what you would like to do.");
};
