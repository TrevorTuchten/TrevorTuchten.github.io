"use strict";

var listArray = [];
 var taskId = 1;
 
 $(function() {
	var newTaskButton = document.getElementById("NewTaskButton");
	var taskInput = document.getElementById("TaskInput");
	var taskID = document.getElementById("TaskID");
	var taskEditButton = document.getElementById("TaskButton");
	var listNode = document.getElementById("ListNode");
	
	function handleNewTaskClick() {
		showEditWindow(true);
	}
	
	function handleEditClick() {
		showEditWindow(false);
		if(taskID.value === "0") {
			addTaskToList(taskInput.value);
		} else {
			editTask(parseInt(taskID.value), taskInput.value);
		}
		taskInput.value = "";
		taskID.value = "0";
		printList();
	}
	
	function addTaskToList(taskText) {
		if(!taskText) return;
		var taskObj = {};
		taskObj.id = taskId++;
		taskObj.done = false;
		taskObj.text = taskText;
		listArray.push(taskObj);
	}
	
	function setupEditAction(id) {
		taskID.value = id;
		// find item and update
		for(var i=0; i<listArray.length; i++) {
			var task = listArray[i];
			if(task.id === id) {
				taskInput.value = task.text;
				break;
			}
		}
		showEditWindow(true);
	}
	
	function editTask(id, text) {
		// find item and update
		for(var i=0; i<listArray.length; i++) {
			var task = listArray[i];
			if(task.id === id) {
				task.text = text;
				break;
			}
		}
	}
	
	function deleteTask(id) {
		// find item and stop for loop so i is our item's index
		for(var i=0; i<listArray.length; i++) {
			var task = listArray[i];
			if(task.id === id) {
				break;
			}
		}
		// if i is < length then it found our item
		if(i < listArray.length) {
			listArray.splice(i,1);
		}
	}
	
	function markTask(id) {
		// find item and update
		for(var i=0; i<listArray.length; i++) {
			var task = listArray[i];
			if(task.id === id) {
				task.done = !task.done;
				break;
			}
		}
	}
	
	function handleListTaskButtons(evt) {
		var target = evt.target;
		evt.preventDefault();
		console.log(target);
		if(target.hasAttribute("data-action")) {
			var action = target.getAttribute("data-action");
			var taskId = target.parentNode.parentNode.getAttribute("rel");
			taskId = parseInt(taskId);
			console.log(taskId);
			switch(action) {
				case "edit":
					// bring up edit window
					setupEditAction(taskId);
					break;
				case "delete":
					if(confirm("Are you sure you want to delete?")) {
						deleteTask(taskId);
						printList();
					}
					break;
				case "mark":
					markTask(taskId);
					printList();
					break;
			}
		}
	}
	
	function printList() {
		listNode.innerHTML = "";
		listArray.forEach(function(task) {
			var newTodo = createListItem(task);
			listNode.appendChild(newTodo);
		});
	}
	
	function showEditWindow(show) {
		var wnd = document.getElementById("EditWindowDiv");
		if(show) {
			wnd.style.display = "block";
			taskInput.focus();
		} else {
			wnd.style.display = "none";
		}
	}
	
	function createListItem(taskObj) {
		var item = document.createElement("li");
		var a = document.createElement("a");
		a.setAttribute("href", "");
		a.innerHTML = taskObj.text + getListControls();
		a.setAttribute("rel", taskObj.id);
		if(taskObj.done) {
			a.style.textDecoration = "line-through";
		}
		item.appendChild(a);
		return item;
	}
	
	function getListControls() {
		var html = "";
		
		html += '<span class="ListControls pull-right">';
		html += '<span class="glyphicon glyphicon-pencil" aria-hidden="true" data-action="edit"></span>';
		html += '<span class="glyphicon glyphicon-ok" aria-hidden="true" data-action="mark"></span>';
		html += '<span class="glyphicon glyphicon-remove" aria-hidden="true" data-action="delete"></span>';
		html += '</span>';
		return html;
	}
	
	newTaskButton.addEventListener('click', handleNewTaskClick);
	taskEditButton.addEventListener('click', handleEditClick);
	
	// handle all edit, delete, done events using a single event handler
	listNode.addEventListener('click', handleListTaskButtons);
	
	// handle enter and escape keys
	document.onkeydown = function keyCheck(e) {	
		var KeyID = (window.event) ? event.keyCode : e.keyCode;
		
		switch(KeyID) {
			case 13: // [enter]
				handleEditClick();
				break;
			case 27: // [esc]
				showEditWindow(false);
				break;
		}
		
	}
 });
 

	
	
