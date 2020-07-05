
var pageContentEl = document.querySelector("#page-content");

//Other two columns
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

// variable to assign a unique ID 
var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//-----function that manages the form
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

  // variable that let's us know if the id is an edit task
  var isEdit = formEl.hasAttribute("data-task-id");
  console.log(isEdit);

  //-----function that completes an edit task 
  var completeEditTask = function(taskName, taskType, taskId) {
    // console.log(taskName, taskType, taskId);
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("span.task-name").textContent = taskName;
    taskSelected.querySelector("h3.task-type").textContent = taskType;

    alert("Task Updated!");

    // // reset the form by removing the task ID and changing the button text back to normal
    // formEl.removeAttribute("data-task-id");
    // document.querySelector("#save-task").textContent = "Add Task";
  };

  // has data attribute, so get task id and call function to complete edit process
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    debugger;
    completeEditTask(taskNameInput, taskTypeInput, taskId);
    // reset the form by removing the task ID and changing the button text back to normal
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
    

  } else 
  {
    // no data attribute, so create object as normal and pass to createTaskEl function
    // package up data as an object
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };
  };
  // send it as an argument to createTaskEl
  createTaskEl(taskDataObj);

  // console.log(event);
  // console.log(document);

  // reset the form

};



//-----function to create a Task
var createTaskEl = function(taskDataObj) {
  // create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // add task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  // give it a class name
  taskInfoEl.className = "task-info";
  // add HTML content to div
  taskInfoEl.innerHTML = "<h3 class='task-type'>" + taskDataObj.type + "</h3><span class='task-name'>" + taskDataObj.name + "</span>";

  listItemEl.appendChild(taskInfoEl);

  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  // add entire list item to list
  tasksToDoEl.appendChild(listItemEl);

  // increase task counter for next unique id
  taskIdCounter++;

  console.log(listItemEl.getAttribute("data-task-id"));

};

//-----function to create a Task Action
var createTaskActions = function(taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);

  // create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(statusSelectEl);

  var statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);
  
    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
};

formEl.addEventListener("submit", taskFormHandler);

var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
};

//----- function to Edit a task
var editTask = function(taskId) {
  console.log("editing task #" + taskId);
  formEl.setAttribute("data-task-id", taskId);
  document.querySelector("#save-task").textContent = "Save Task";

  // get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // get content from task name and type
  var taskName = taskSelected.querySelector("span.task-name").textContent;
  console.log(taskName);

  var taskType = taskSelected.querySelector("h3.task-type").textContent;
  console.log(taskType);

  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;

};

//-- event handler for a task's button
var taskButtonHandler = function(event) {
  // get target element from event
  var targetEl = event.target;

  // edit button was clicked
  if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  } 
  // delete button was clicked
  else if (targetEl.matches(".delete-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

//---Function to handle the change of events
var taskStatusChangeHandler = function(event) {
  // get the task item's id
  var taskId = event.target.getAttribute("data-task-id");

  // get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } 
  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } 
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }

};



pageContentEl.addEventListener("click", taskButtonHandler);

// Listens to the change of an event
pageContentEl.addEventListener("change", taskStatusChangeHandler);


