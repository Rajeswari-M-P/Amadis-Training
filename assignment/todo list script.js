const input = document.querySelector(".todo-input");
const addButton = document.querySelector(".add-button");
const todosHtml = document.querySelector(".todos");
const emptyImage = document.querySelector(".empty-image");
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
const deleteAllButton = document.querySelector(".delete-all");
const filters = document.querySelectorAll(".filter");
let filter = '';

// Show todos initially
showTodos();

// Function to generate HTML for each todo item
function getTodoHtml(todo, index) {
  if (filter && filter !== todo.status) {
    return '';
  }
  let checked = todo.status === 'completed' ? 'checked' : '';
  let priorityText = todo.priority === 'important' ? 'Least Important' : 'Important';
  return /* html */ `
    <li class="todo ${todo.priority}">
      <label for="${index}">
        <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
        <span class="${checked ? 'checked' : ''}">${todo.name}</span>
      </label>
      <button class="priority-btn" onclick="togglePriority(this)" data-index="${index}">
        ${priorityText}
      </button>
      <button class="delete-btn" data-index="${index}" onclick="removeTask(this)">
        <i class="fa fa-times"></i>
      </button>
    </li>
  `;
}

// Function to display todos
function showTodos() {
  if (todosJson.length === 0) {
    todosHtml.innerHTML = '';
    emptyImage.style.display = 'block';
  } else {
    todosHtml.innerHTML = todosJson.map(getTodoHtml).join('');
    emptyImage.style.display = 'none';
  }
}

// Function to add a new todo
function addTodo() {
  let todo = input.value.trim();
  if (!todo) {
    return;
  }
  todosJson.unshift({ name: todo, status: 'pending', priority: '' });
  localStorage.setItem('todos', JSON.stringify(todosJson));
  input.value = ''; // Clear input field after adding task
  showTodos();
}

// Event listener for add button
addButton.addEventListener('click', addTodo);

// Function to update task status (completed or pending)
function updateStatus(input) {
  let index = input.id;
  todosJson[index].status = input.checked ? 'completed' : 'pending';
  localStorage.setItem('todos', JSON.stringify(todosJson));
}

// Function to toggle task priority
function togglePriority(button) {
  let index = button.getAttribute('data-index');
  let todo = todosJson[index];
  todo.priority = todo.priority === 'important' ? 'least-important' : 'important';
  // Move the task to the top or bottom based on priority
  if (todo.priority === 'important') {
    // Move to top
    todosJson.splice(index, 1);
    todosJson.unshift(todo);
  } else {
    // Move to bottom
    todosJson.splice(index, 1);
    todosJson.push(todo);
  }
  localStorage.setItem('todos', JSON.stringify(todosJson));
  showTodos();
}

// Function to remove a task
function removeTask(button) {
  let index = button.getAttribute('data-index');
  todosJson.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todosJson));
  showTodos();
}

// Event listener for Complete and Incomplete filters
filters.forEach(filterBtn => {
  filterBtn.addEventListener('click', () => {
    if (filterBtn.classList.contains('active')) {
      filterBtn.classList.remove('active');
      filter = '';
    } else {
      filters.forEach(tag => tag.classList.remove('active'));
      filterBtn.classList.add('active');
      filter = filterBtn.dataset.filter;
    }
    showTodos();
  });
});

// Event listener for Delete All button
deleteAllButton.addEventListener('click', () => {
  todosJson =[]; //todosJson.filter(todo => todo.status !== 'completed');
  localStorage.setItem('todos', JSON.stringify(todosJson));
  showTodos();
});

// Function to handle Enter key press for adding todos
input.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});
