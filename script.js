// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Initialize and Load Tasks
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function loadTasks() {
        tasks.forEach(task => {
            createTaskElement(task.text);
        });
    }

    function createTaskElement(taskText) {
        // Create a new li element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a new remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // Assign an onclick event to remove the li element
        removeButton.onclick = function () {
            removeTask(taskText, li);
        };

        // Append the remove button to the li element
        li.appendChild(removeButton);

        // Append the li to taskList
        taskList.appendChild(li);
    }

    function addTask() {
        // Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Add the new task to the tasks array
        tasks.push({ text: taskText });
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Create and append the new task element
        createTaskElement(taskText);

        // Clear the task input field
        taskInput.value = '';
    }

    function removeTask(taskText, li) {
        // Remove the task from the tasks array
        tasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Remove the task element from the DOM
        taskList.removeChild(li);
    }

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Attach Event Listeners
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function (event) {
        // Check if Enter key is pressed
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
