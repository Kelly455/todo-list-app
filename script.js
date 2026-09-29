let taskInput = document.getElementById("taskInput");
let addTaskButton = document.getElementById("addTaskBtn");
let taskList = document.getElementById("taskList");

let tasks = [];
let currentFilter = 'all';
const filterButtons = document.querySelectorAll('#filters button');

const savedTasks = localStorage.getItem('tasks');
if (savedTasks !== null) {
  tasks = JSON.parse(savedTasks);
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  saveTasks();
  taskList.innerHTML = '';

  filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === currentFilter);
  });

  const visibleTasks = tasks.filter(task => {
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  visibleTasks.forEach(task => {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = task.text;
  span.style.textDecoration = task.completed ? 'line-through' : 'none';

  const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;

    checkbox.addEventListener('click', () => {
      tasks = tasks.map(t =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      );
      renderTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';

    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

addTaskButton.addEventListener('click', () => {
  const text = taskInput.value.trim();

  if (text === '') {
    return;
  }

  const newTask = {
    id: Date.now(),
    text: text,
    completed: false
  };

  tasks.push(newTask);
  renderTasks();

  taskInput.value = '';
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

renderTasks();