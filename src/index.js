import './style.css';

const TODO_LIST_KEY = 'TODO_LIST_KEY';

const todoList = JSON.parse(localStorage.getItem(TODO_LIST_KEY)) || [];

const todoListContainer = document.querySelector('#list');
const form = document.querySelector('.form');

form.addEventListener('submit', () => {
  const inputField = document.querySelector('#todo-input');
  const template = document.querySelector('#list-item-template');
  const templateClone = template.content.cloneNode(true);
  const taskContent = templateClone.querySelector('[data-list-item-text]');
  const checkBox = templateClone.querySelector('[data-list-item-checkbox]');

  const obj = {
    description: inputField.value,
    completed: false,
    index: todoList.length,
  };
  todoList.push(obj);
  localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoList));
  taskContent.innerText = inputField.value;
  checkBox.checked = checkBox.checked ? true : false;
  todoListContainer.appendChild(templateClone);
  console.log(todoList);
});

todoList.forEach((todo) => {
  const template = document.querySelector('#list-item-template');
  const templateClone = template.content.cloneNode(true);
  const taskContent = templateClone.querySelector('[data-list-item-text]');
  const checkBox = templateClone.querySelector('[data-list-item-checkbox]');
  checkBox.addEventListener('change', (e) => {
    console.log('Index: ', todo.index);
    if (checkBox.checked) {
      taskContent.classList.add('line-through');
      todo.completed = checkBox.checked;
      localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoList));
      console.log('Checkbox Completed: ', todo.completed);
    } else {
      taskContent.classList.remove('line-through');
      todo.completed = checkBox.checked;
      localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoList));
      console.log('Checkbox Completed: ', todo.completed);
    }
  });
  taskContent.innerText = todo.description;
  checkBox.checked = todo.completed;
  if (checkBox.checked) {
    taskContent.classList.add('line-through');
  } else {
    taskContent.classList.remove('line-through');
  }
  todoListContainer.appendChild(templateClone);
});
