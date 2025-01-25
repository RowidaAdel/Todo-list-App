const inputBox = document.getElementById('input_box');
const addTaskBtn = document.getElementById('btn');
const taskList = document.getElementById('task_list');

// Load tasks from localStorage
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.className = 'task_item';

    const taskSpan = document.createElement('span');
    taskSpan.textContent = task;

    const editBtn = document.createElement('button');
    editBtn.className = 'edit_btn';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editTask(index));

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete_btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(index));

    taskItem.appendChild(taskSpan);
    taskItem.appendChild(editBtn);
    taskItem.appendChild(deleteBtn);

    taskList.appendChild(taskItem);
  });
}

// Save tasks to Storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add new task
function addTask() {
  const taskText = inputBox.value.trim();
  if (taskText !== '') {
    tasks.push(taskText);
    saveTasks();
    renderTasks();
    inputBox.value = '';
  } else {
    alert('Task cannot be empty!');
  }
}

// Edit task
function editTask(index) {
  const newTask = prompt('Edit your task:', tasks[index]);
  if (newTask !== null && newTask.trim() !== '') {
    tasks[index] = newTask.trim();
    saveTasks();
    renderTasks();
  }
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Event for Enter
let insert;
inputBox.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    clearTimeout(insert);
    insert = setTimeout(addTask, 300);
  }
});

// Add task button click
addTaskBtn.addEventListener('click', addTask);

// Initial render
renderTasks();
