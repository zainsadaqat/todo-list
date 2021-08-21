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
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoList));
  });
  const listItem = templateClone.querySelector('.list-item');
  listItem.dataset.todoIndex = todo.index + 1;
  todoListContainer.appendChild(templateClone);
};

let todoList = loadList();
todoList.forEach((todo) => renderTodo(todo));

const clearField = () => {
  inputField.value = '';
};

form.addEventListener('submit', () => {
  if (inputField.value === '') return;

  const todoTemplate = new Todo(todoList.length, inputField.value, false);
  todoList.push(todoTemplate);
  renderTodo(todoTemplate);
  localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoList));
  clearField();
});

const setIndex = () => {
  let length = todoList.length;
  for (let i = 0; i < length; i += 1) {
    todoList[i].index = i + 1;
  }
};

todoListContainer.addEventListener('click', (e) => {
  if (!e.target.matches('[data-button-delete]')) return;

  const parent = e.target.closest('.list-item');
  const todoIndex = parseInt(parent.dataset.todoIndex);
  parent.remove(); // removes from the screen
  todoList = todoList.filter((todo) => todo.index !== todoIndex); // removes from the list
  localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoList));
});

clearAllCompleted.addEventListener('click', () => {
  todoList = todoList.filter((todo) => todo.completed === false);
  setIndex();
  localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoList));
  location.reload();
});

todoListContainer.addEventListener('click', (e) => {
  if (!e.target.matches('[data-button-edit]')) return;

  const parent = e.target.closest('.list-item');
  const todoId = parent.dataset.todoIndex;
  const todoIndex = parent.querySelector('[data-list-item-text]');
  const editedTodo = prompt('Please edit your todo', '');
  if (editedTodo != null) {
    todoList[todoId].description = editedTodo;
  }
  localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoList));
  location.reload();
});
