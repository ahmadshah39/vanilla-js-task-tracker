import "../scss/style.scss";
// Initializing a variable tasksArray
let tasksArray;
// Fetching DOM Elements
const Addform = document.querySelector(".add-Task-form");
const editform = document.querySelector(".edit-Task-form");
const taskList = document.querySelector(".task-list");
const addTask = document.querySelector(".add-task");
const cancel = document.querySelector(".cancel");
const clearAll = document.querySelector(".clearAll");

// Assigning values to tasksArray based on localstorage
const tasks = localStorage.getItem("tasks");
if (!tasks) {
  tasksArray = [];
  clearAll.style.display = "none";
} else {
  tasksArray = JSON.parse(tasks);
  clearAll.style.display = "block";
}

// showTask method for inserting tasks into DOM
const showTask = () => {
  // initializing an empty variable listItems
  let listItems = "";
  // Pushing tasks from tasksArray to listItems
  tasksArray.forEach((task, index) => {
    listItems += `<li class="task-item ${
      task.isCompleted === true ? "task-completed" : ""
    }" data-index ="${index}">
        <div>
        <p>${task.task}
        </p>
        <span>${task.dateTime}</span>
        </div>
        <div class="task-item-controls">
        <i class="fas fa-pencil-alt edit"></i>
        <i class="fas fa-trash delete"></i>
        </div>`;
  });

  // Inserting listItems to the dom
  if (!listItems) {
    taskList.innerHTML =
      "<li class='text-info d-flex justify-content-center'>No Tasks Have been Added yet...</li>";
    clearAll.style.display = "none";
    return;
  }
  taskList.innerHTML = listItems;
  clearAll.style.display = "block";
};

// rendering tasks to to the dom
document.addEventListener("domContentLoaded", showTask());

// Event listener for addTask button
addTask.addEventListener("click", (e) => {
  e.preventDefault();
  Addform.style.display = "block";
  addTask.style.display = "none";
  cancel.style.display = "block";
});

// Event listener for Cancel button
cancel.addEventListener("click", (e) => {
  e.preventDefault();
  Addform.Task.value = "";
  Addform.datetime.value = "";
  Addform.isCompleted.checked = false;
  editform.Task.value = "";
  editform.datetime.value = "";
  editform.isCompleted.checked = false;
  Addform.style.display = "none";
  editform.style.display = "none";
  addTask.style.display = "block";
  cancel.style.display = "none";
});

// Add a new task to task array and store to loacalstorage
Addform.addEventListener("submit", (e) => {
  e.preventDefault();
  // Fetch Form Values
  const task = Addform.Task.value;
  const dateTime = Addform.datetime.value;
  const isCompleted = Addform.isCompleted.checked;
  // Validating
  if (!/\w/.test(task) && !/\w/.test(dateTime)) {
    alert("Please add a Task");
    return;
  }
  // Pushing the values in the Task Array
  tasksArray.unshift({ task, dateTime, isCompleted });
  // Setting Task Array To LocalStorage
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  // Re-rendering Tasks
  showTask();
  // Removing Form  values
  Addform.Task.value = "";
  Addform.datetime.value = "";
  Addform.isCompleted.checked = false;
});

// Event listner for delete and edit
taskList.addEventListener("click", (e) => {
  e.preventDefault();
  const target = e.target;
  // Checking and handling Delete event
  if (target.classList.contains("delete")) {
    let index = target.parentElement.parentElement.getAttribute("data-index");
    tasksArray.splice(index, 1);
    // Storing new Array to localstorage after delete
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    // re-rendering tasks
    showTask();
  }
  // checking & handling edit event
  if (target.classList.contains("edit")) {
    let index = target.parentElement.parentElement.getAttribute("data-index");
    Addform.style.display = "none";
    editform.style.display = "block";
    addTask.style.display = "none";
    cancel.style.display = "block";
    let task = tasksArray.slice(index);
    editform.setAttribute("task-index", index);
    editform.Task.value = task[0].task;
    editform.datetime.value = task[0].dateTime;
    editform.isCompleted.checked = task[0].isCompleted;
  }
});

editform.addEventListener("submit", (e) => {
  e.preventDefault();
  // Fetch Form Values
  let task = editform.Task.value;
  let dateTime = editform.datetime.value;
  let isCompleted = editform.isCompleted.checked;
  let index = editform.getAttribute("task-index");
  // Validating
  if (!/\w/.test(task) && !/\w/.test(dateTime)) {
    alert("Please add a Task");
    return;
  }
  // Finding the values in the Task Array
  tasksArray.splice(index, 1, { task, dateTime, isCompleted });
  // Setting Task Array To LocalStorage
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  // Re-rendering Tasks
  showTask();
  // Removing Form from dom
  editform.style.display = "none";
  editform.Task.value = "";
  editform.datetime.value = "";
  editform.isCompleted.checked = false;
  addTask.style.display = "block";
  cancel.style.display = "none";
});

// checking & handling edit event
taskList.addEventListener("dblclick", (e) => {
  if (e.target.classList.contains("task-item")) {
    console.log(e.target);
    let index = e.target.getAttribute("data-index");
    let task = tasksArray.slice(index);
    let updatedTask = {
      task: task[0].task,
      dateTime: task[0].dateTime,
      isCompleted: !task[0].isCompleted,
    };
    // Finding the values in the Task Array
    tasksArray.splice(index, 1, updatedTask);
    // Storing new Array to localstorage after delete
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    // re-rendering tasks
    showTask();
  }
});

clearAll.addEventListener("click", () => {
  tasksArray = [];
  // Storing new Array to localstorage after delete
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  clearAll.style.display = "none";
  showTask();
});
