// Trevor Tuchten
// counter
//mon 2-1-2016

var count = 0;

function myClickUpHandler(event) {
	count ++;
	document.getElementById("myCount").innerHTML = count;
	printPyramid(count);
}

document.getElementById("myBtnUp").onclick = myClickUpHandler;

function myClickDownHandler(event) {
	if(count <= 0) {
		return "0";
	} else {
	count --;
	document.getElementById("myCount").innerHTML = count;
	printPyramid(count);
	}
	
}

document.getElementById("myBtnDown").onclick = myClickDownHandler;

function myClickResetHandler(event) {
	count = 0;
	document.getElementById("myCount").innerHTML = count;
	printPyramid(count);
}

document.getElementById("myBtnReset").onclick = myClickResetHandler;


function printPyramid(cnt) {
var outputStr = "";
for(var j=0; j<cnt; j++) {
	outputStr += "<p>";
		for(var k=0; k<=j ; k++) {
			outputStr += "#";
		}
	outputStr += "</p>";
}
// print to the page
document.getElementById("myPyramid").innerHTML = outputStr;
}