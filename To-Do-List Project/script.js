function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value.trim();

    if (taskValue === "") {
        alert(" Please enter a valid task.");
        return;
    }

    addTaskToDOM(taskValue);
    saveTask(taskValue);
    taskInput.value = "";
    showFeedback("Task added successfully!");
}

function addTaskToDOM(task) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.textContent = task;

    const editButton = document.createElement('button');
    editButton.textContent = "Edit";
    editButton.onclick = () => editTask(li, task);
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteTask(li, task);

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

function editTask(li, oldTask) {
    const newTask = prompt("Edit your task:", oldTask);
    if (newTask !== null && newTask.trim() !== "") {
        const taskList = document.getElementById('taskList');
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskIndex = tasks.indexOf(oldTask);
        tasks[taskIndex] = newTask.trim();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        li.firstChild.textContent = newTask.trim();
        showFeedback("Task edited successfully!");
    }
}

function deleteTask(li, task) {
    const taskList = document.getElementById('taskList');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.indexOf(task);
    tasks.splice(taskIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskList.removeChild(li);
    showFeedback("Task deleted successfully!");
}

function clearTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = "";
    localStorage.removeItem('tasks');
    showFeedback("All tasks cleared!");
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showFeedback(message) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = message;
    setTimeout(() => {
        feedback.textContent = "";
    }, 3000);
}

document.addEventListener('DOMContentLoaded', loadTasks);