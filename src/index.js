import Todo from './todo.js';
import checkBoxEvent from './checkbox.js';
import './style.css';

const TODO_LIST_KEY = 'TODO_LIST_KEY';

const loadList = () => {
  const dataInStringFormat = localStorage.getItem(TODO_LIST_KEY);
  return JSON.parse(dataInStringFormat) || [];
};

const todoList = loadList();

const saveList = () => {
  localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoList));
};

const todoListContainer = document.querySelector('#list');
const form = document.querySelector('.form');
const inputField = document.querySelector('#todo-input');

const clearField = () => {
  inputField.value = '';
};

form.addEventListener('submit', () => {
  if (inputField.value === '') return;

  // Access Template Elements
  const template = document.querySelector('#list-item-template');
  const templateClone = template.content.cloneNode(true);
  const taskContent = templateClone.querySelector('[data-list-item-text]');
  const checkBox = templateClone.querySelector('[data-list-item-checkbox]');

  // Create a new Todo
  const todoTemplate = new Todo(todoList.length, inputField.value, false);
  todoList.push(todoTemplate);
  saveList();
  taskContent.innerText = inputField.value;
  if (checkBox.checked) {
    taskContent.classList.add('.line-through');
    checkBox.checked = true;
  } else {
    taskContent.classList.remove('.line-through');
    checkBox.checked = false;
  }
  todoListContainer.appendChild(templateClone);
  clearField();
});

todoList.forEach((todo) => {
  const template = document.querySelector('#list-item-template');
  const templateClone = template.content.cloneNode(true);
  const taskContent = templateClone.querySelector('[data-list-item-text]');
  const checkBox = templateClone.querySelector('[data-list-item-checkbox]');
  checkBox.addEventListener('change', () => {
    // Save checkbox event in local storage
    checkBoxEvent(todo, checkBox, taskContent, saveList);
  });
  taskContent.innerText = todo.description;
  checkBox.checked = todo.completed;
  saveList();
  if (checkBox.checked) {
    taskContent.classList.add('line-through');
  } else {
    taskContent.classList.remove('line-through');
  }
  todoListContainer.appendChild(templateClone);
});
