var formEl = document.querySelector("#task-form");
var taskToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");
var taskIdCounter = 0;

var taskFormHandler = function (event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  var isEdit = formEl.hasAttribute("data-task-id");

  // has data attribute, so get task id and call function to complete edit process
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  }
  // no data attribute, so create object as normal and pass to createTaskEl function
  else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
    };

    createTaskEl(taskDataObj);
  }
  //check if input values are empty strings
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }
  formEl.reset();
};

var completeEditTask = function (taskName, taskType, taskId) {
  //find the matching task list item
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  //set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  alert("Task Updated!");

  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
};

var createTaskEl = function (taskDataObj) {
  //create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  //add task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  //create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";

  //add html content to the div
  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" +
    taskDataObj.name +
    "</h3><span class='task-type'>" +
    taskDataObj.type +
    "</span>";
  listItemEl.appendChild(taskInfoEl);

  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  //add entire list item to list
  taskToDoEl.appendChild(listItemEl);

  //increase task counter for next unique id
  taskIdCounter++;

  console.dir(taskFormHandler);
};

var createTaskActions = function (taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  //create new button element
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);

  //create delete button
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
    statusOptionEl.setAttribute("value", statusChoices[i]);
    statusOptionEl.textContent = statusChoices[i];

    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }
  return actionContainerEl;
};

var taskButtonHandler = function (event) {
  //get target element from event
  var targetEl = event.target;

  //edit button was clicked
  if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  }

  //delete button was clicked
  else if (targetEl.matches(".delete-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

var editTask = function (taskId) {
  console.log("editing task #" + taskId);

  //get task list item element
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;

  var taskType = taskSelected.querySelector("span.task-type").textContent;
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  document.querySelector("#save-task").textContent = "Save Task";
  formEl.setAttribute("data-task-id", taskId);
};

var deleteTask = function (taskId) {
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  taskSelected.remove();
};

var taskStatusChangeHandler = function(event) {
  //get the task item's id
  var taskId = event.target.getAttribute("data-task-id");

  //get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  //find the parent task item element based on the id
  var taskSelect = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  if (statusValue === "to do") {
    taskToDoEl.appendChild(taskSelect);
  }
  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelect);
  }
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelect);
  }
};

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);

// Create a new feature branch. We'll create a feature branch that corresponds to the GitHub issue we're addressing in this lesson.

// Add two new lists in the HTML. We'll add a Tasks In Progress and a Tasks Completed list to Taskmaster.

// Apply a unique id to each task. We'll create an id that uniquely identifies each task that's created.

// Dynamically create task buttons for each task. Once we have an id for each task, we can start adding buttons and dropdowns that reference the id. Because a task and its id are dynamically created, these buttons and dropdowns will also be dynamic.

// Add the ability to delete a task. We'll use event listeners to allow the user to delete tasks.

// Load the task into the form to be edited. Users might want to edit existing tasks. We'll enable this by making sure the right task data loads in the editing form.

// Save the edited task. Users will want to save their edits to a task; we'll make sure they can do that.

// Move the task based on status. If the user changes the status of a task, we'll make sure it is moved to the appropriate list.

// Save your progress with Git. You did it! It's time to merge your feature branch into the develop branch and commit your changes to GitHub.
