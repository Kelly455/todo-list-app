let taskInput = document.getElementById("taskInput");
let addTaskButton = document.getElementById("addTaskBtn");
let taskList = document.getElementById("taskList");

let tasks = [];

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;

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

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';

    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);

      renderTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
checkbox.checked = task.completed;

checkbox.addEventListener('click', () => {
  tasks = tasks.map(t => 
    t.id === task.id ? { ...t, completed: !t.completed } : t
  );
  renderTasks();
});

li.appendChild(checkbox);

li.style.textDecoration = task.completed ? 'line-through' : 'none';