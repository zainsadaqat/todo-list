import Todo from './todo';
import { checkBoxEvent } from './checkbox';
import './style.css';

const TODO_LIST_KEY = 'TODO_LIST_KEY';

const loadList = () => {
  let dataInStringFormat = localStorage.getItem(TODO_LIST_KEY);
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
  checkBox.checked = checkBox.checked ? true : false;
  todoListContainer.appendChild(templateClone);
  console.log(todoList);
  clearField();
});

todoList.forEach((todo) => {
  const template = document.querySelector('#list-item-template');
  const templateClone = template.content.cloneNode(true);
  const taskContent = templateClone.querySelector('[data-list-item-text]');
  const checkBox = templateClone.querySelector('[data-list-item-checkbox]');
  checkBox.addEventListener('change', (e) => {
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
