import Todo from './todo.js';
import './style.css';

const TODO_LIST_KEY = 'TODO_LIST_KEY';
const template = document.querySelector('#list-item-template');
const todoListContainer = document.querySelector('#list');
const form = document.querySelector('.form');
const inputField = document.querySelector('#todo-input');
const clearAllCompleted = document.querySelector('.clear-all-completed');

const loadList = () => {
  const dataInStringFormat = localStorage.getItem(TODO_LIST_KEY);
  return JSON.parse(dataInStringFormat) || [];
};

const saveList = () => {
  localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoList));
};

const renderTodo = (todo) => {
  const templateClone = template.content.cloneNode(true);
  const taskContent = templateClone.querySelector('[data-list-item-text]');
  taskContent.innerText = todo.description;
  const checkBox = templateClone.querySelector('[data-list-item-checkbox]');
  checkBox.checked = todo.completed;
  checkBox.addEventListener('change', () => {
    todo.completed = checkBox.checked;
    saveList();
  });
  const listItem = templateClone.querySelector('.list-item');
  listItem.dataset.todoIndex = todo.index;
  todoListContainer.appendChild(templateClone);
};

let todoList = loadList();
todoList.forEach((todo) => renderTodo(todo));

const clearField = () => {
  inputField.value = '';
};

// When user submits a todo
form.addEventListener('submit', () => {
  if (inputField.value === '') return;
  // Create a new Todo
  const todoTemplate = new Todo(todoList.length, inputField.value, false);
  todoList.push(todoTemplate); // new todo gets added to the list
  renderTodo(todoTemplate); //Here it adds that new todo to the list
  saveList();
  clearField();
});

// Delete a todo
todoListContainer.addEventListener('click', (e) => {
  if (!e.target.matches('[data-button-delete]')) return;

  // Get the todo that is clicked on
  const parent = e.target.closest('.list-item');
  const todoIndex = parseInt(parent.dataset.todoIndex);
  parent.remove(); // removes from the screen
  todoList = todoList.filter((todo) => todo.index !== todoIndex); // removes from the list
  saveList(); // saves updated list
});

// Clear all selected todos
clearAllCompleted.addEventListener('click', (e) => {
  todoList = todoList.filter((todo) => todo.completed === false);
  saveList();
  location.reload();
});
