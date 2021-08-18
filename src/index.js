import './style.css';

const todo_list = [
  {
    description: 'Finish JS Activities',
    completed: true,
    index: 0,
  },
  {
    description: 'Finish CSS Activities',
    completed: false,
    index: 1,
  },
  {
    description: 'Finish HTML Activities',
    completed: true,
    index: 2,
  },
  {
    description: 'Finish Webpack Activities',
    completed: false,
    index: 3,
  },
];

// access html elements
const todoListContainer = document.querySelector('#list');
const form = document.querySelector('.form');
const inputField = document.querySelector('#todo-input');
const template = document.querySelector('#list-item-template');

// Access template elements
todo_list.forEach((todo) => {
  const templateClone = template.content.cloneNode(true);
  const listItem = templateClone.querySelector('.list-item');
  const taskContent = templateClone.querySelector('[data-list-item-text]');
  taskContent.innerText = todo.description;
  const checkBox = templateClone.querySelector('[data-list-item-checkbox]');
  checkBox.checked = todo.completed;
  todoListContainer.appendChild(templateClone);
});
