var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event) {

  event.preventDefault();
  // add variable to hold the input form the user
  var taskNameInput = document.querySelector("input[name='task-name']").value;

  // add variable to hold the type selection form the user
  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  console.log(taskTypeInput);

    // check if input values are empty strings
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }

  // reset the form
  formEl.reset();

  // package up data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };



  // send it as an argument to createTaskEl
  createTaskEl(taskDataObj);

  // console.log(event);
  // console.log(document);

  // reset the form

};

var createTaskEl = function(taskDataObj) {
  // create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  // give it a class name
  taskInfoEl.className = "task-info";
  // add HTML content to div
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.type + "</h3><span class='task-type'>" + taskDataObj.name + "</span>";

  listItemEl.appendChild(taskInfoEl);

  // add entire list item to list
  tasksToDoEl.appendChild(listItemEl);

};

formEl.addEventListener("submit", taskFormHandler);

