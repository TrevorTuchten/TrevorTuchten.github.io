// Trevor Tuchten
//day 9 Quiz
//mon 2-8-2016
"use strict"

//problem 1
/*Create a function with the signature 
num2arr(num1,num2) that takes two number 
arguments and returns an array. The first number 
in the array should be the two numbers added 
together, and the second number in the array 
should be the two numbers multiplied together.*/

function prob1(num1, num2) {
	var array = [(parseInt(num1) + parseInt(num2)) + "," + " " + (parseInt(num1) * parseInt(num2))];
	console.log(array);
}

//problem 2
/*Create a function with the signature 
numCompare(num1,num2) that takes two number 
arguments. If the first number is larger, return 
the string "larger". If the numbers are equal, 
return the string "equal". If the first number 
is smaller, return the string "smaller".*/

function prob2(num1, num2) {
	if(num1 > num2) {
		console.log("larger");
	} else {
		console.log("smaller");
	}
}

//problem 3
/*Create a loop that prints out the numbers 
1 – 100. If a number is divisible by 3, print 
"Fizz" instead of the number. If a number is 
divisible by 5, print "Buzz" instead of the 
number. If a number is divisible by both 3 and 
5, print "FizzBuzz" instead of the number.*/

function prob3() {
for (var n = 1; n <= 100; n++) {
  var output = "";
  if (n % 3 == 0)
    output += "Fizz";
  if (n % 5 == 0)
    output += "Buzz";
  console.log(output || n);
}
}

//problem 4
/*Create a function that takes a single 
character as an input and returns true is the 
character is capitalized and false if the 
character is lowercase.*/

function prob4(cap1) {
	if(cap1 === cap1.toUpperCase()) {
			console.log("true");
	} else { 
			console.log("false");
	}
};

//problem 5
/*Create a function that takes a string as an 
input and returns an array of the characters in 
the string.*/

function prob5(string) {
	var array = string.split("");
	console.log(array);
}

//problem 6
/*Challenge: Create a function that takes an 
array of unsorted numbers as an input argument 
and returns the array sorted from least to 
greatest.*/

function prob6(myarray) {
	var myarray1 = myarray;
	return myarray1.sort(function(a,b){return a - b})
}
	
