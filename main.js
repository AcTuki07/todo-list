
function saveTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  return JSON.parse(localStorage.getItem('todos')) || [];
}

$('#todoForm').on('submit', function(event) {
  event.preventDefault();
  
  const todoTitle = $('#todoTitle').val().trim();
  if (todoTitle === '') {
    alert('No puedes agregar un todo vacío.');
    return;
  }

  const todos = loadTodos();
  const newTodo = { title: todoTitle, completed: false };
  
  todos.push(newTodo);
  saveTodos(todos);

  alert('Todo agregado exitosamente.');
  $('#todoTitle').val('');
  renderTodos();
});

function renderTodos() {
  const todos = loadTodos();
  const $todoList = $('#todoList');
  $todoList.empty();

  todos.forEach((todo, index) => {
    $todoList.append(`
      <li>
        <input type="checkbox" class="todo-check" data-index="${index}" ${todo.completed ? 'checked' : ''}>
        <span class="${todo.completed ? 'completed' : ''}">${todo.title}</span>
        <button class="delete-todo" data-index="${index}">Eliminar</button>
      </li>
    `);
  });
}

$('#todoList').on('click', '.delete-todo', function() {
  const index = $(this).data('index');
  let todos = loadTodos();

  todos.splice(index, 1);
  saveTodos(todos);

  renderTodos();
});

$('#todoList').on('change', '.todo-check', function() {
  const index = $(this).data('index');
  let todos = loadTodos();

  todos[index].completed = !todos[index].completed;
  saveTodos(todos);

  renderTodos();
});

$(document).ready(function() {
  renderTodos();
});
