// Get references to various HTML elements
const searchBar = document.getElementById("search-bar");
const listContainer = document.getElementById("list-container");
const clearAllButton = document.getElementById("clear-all");
const tasksLeftCounter = document.getElementById("tasks-left");
const completedTasksCounter = document.getElementById("completed-tasks");
const incompleteTasksCounter = document.getElementById("incomplete-tasks");
const filterCompletedButton = document.querySelector(".filter-buttons button:nth-child(1)");
const filterIncompleteButton = document.querySelector(".filter-buttons button:nth-child(2)");
const clearSelectedButton = document.getElementById("clear-selected");
const showAllButton = document.getElementById("show-all");

// Function to update task counters in the footer
function updateTaskCounters() {
    const taskItems = listContainer.querySelectorAll("li");
    let completedTasks = 0;
    let pendingTasks = 0;

    taskItems.forEach((item) => {
        if (item.classList.contains("checked")) {
            completedTasks++;
        } else {
            pendingTasks++;
        }
    });

    // Update the footer counters
    tasksLeftCounter.textContent = `Tasks Left: ${pendingTasks}`;
    completedTasksCounter.textContent = `Completed Tasks: ${completedTasks}`;
    incompleteTasksCounter.textContent = `Incomplete Tasks: ${pendingTasks}`;
}

// Function to add a new task
function addTask() {
    if (searchBar.value === "") {
        alert("You must write something to add a task!");
    } else {
        const li = document.createElement("li");
        li.innerHTML = `<span class="close">\u00d7</span>${searchBar.value}`;
        listContainer.appendChild(li);
        searchBar.value = "";
        saveData();
        updateTaskCounters();
    }
}

// Function to handle the Enter key press
function handleEnterKey(event) {
    if (event.key === "Enter") {
        addTask();
    }
}
searchBar.addEventListener("keypress", handleEnterKey);

// Function to filter and display completed tasks
function filterCompleted() {
    const taskItems = listContainer.querySelectorAll("li");
    taskItems.forEach((item) => {
        if (item.classList.contains("checked")) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

// Function to filter and display incomplete tasks
function filterIncomplete() {
    const taskItems = listContainer.querySelectorAll("li");
    taskItems.forEach((item) => {
        if (!item.classList.contains("checked")) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

// Function to display all tasks
function showAllTasks() {
    const taskItems = listContainer.querySelectorAll("li");
    taskItems.forEach((item) => {
        item.style.display = "block";
    });
}

// Event listener for task list item clicks (mark as completed or delete)
listContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("close")) {
        e.target.parentElement.remove();
    } else if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    }
    saveData();
    updateTaskCounters();
});

// Function to save task data to local storage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to save task status (completed or incomplete) to local storage
function saveTaskStatus() {
    const taskItems = listContainer.querySelectorAll("li");
    const completedTasks = [];
    const incompleteTasks = [];

    taskItems.forEach((item) => {
        if (item.classList.contains("checked")) {
            completedTasks.push(item.textContent);
        } else {
            incompleteTasks.push(item.textContent);
        }
    });

    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    localStorage.setItem("incompleteTasks", JSON.stringify(incompleteTasks));
}

// Function to clear all tasks
function clearAllTasks() {
    listContainer.innerHTML = "";
    localStorage.removeItem("data");
    localStorage.removeItem("completedTasks");
    localStorage.removeItem("incompleteTasks");
    showAllTasks();
    updateTaskCounters();
}

// Event listener for the "Clear All" button
clearAllButton.addEventListener("click", clearAllTasks);

// Event listener for the window load event
window.addEventListener("load", function () {
    showTask();
    updateTaskCounters();
});

// Function to display tasks from local storage on page load
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    const incompleteTasks = JSON.parse(localStorage.getItem("incompleteTasks")) || [];

    // Mark tasks as completed or incomplete
    const taskItems = listContainer.querySelectorAll("li");
    taskItems.forEach((item) => {
        if (completedTasks.includes(item.textContent)) {
            item.classList.add("checked");
        }
    });
}

// Function to clear selected completed tasks
function clearSelectedTasks() {
    const completedTaskItems = listContainer.querySelectorAll("li.checked");
    completedTaskItems.forEach((item) => {
        item.remove();
    });
    saveData();
    updateTaskCounters();
}


// Event listener for the "Clear Selected" button
clearSelectedButton.addEventListener("click", clearSelectedTasks);

// Function to show all tasks
function showAllTasks() {
    const taskItems = listContainer.querySelectorAll("li");
    taskItems.forEach((item) => {
        item.style.display = "block";
    });
}

// Event listener for the "Show All" button
showAllButton.addEventListener("click", showAllTasks);

// Display tasks and update counters on page load
showTask();
updateTaskCounters();
