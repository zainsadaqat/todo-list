import './style.css';

const todoList = [
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

const todoListContainer = document.querySelector('#list');
const template = document.querySelector('#list-item-template');

todoList.forEach((todo) => {
  const templateClone = template.content.cloneNode(true);
  const taskContent = templateClone.querySelector('[data-list-item-text]');
  taskContent.innerText = todo.description;
  const checkBox = templateClone.querySelector('[data-list-item-checkbox]');
  checkBox.checked = todo.completed;
  todoListContainer.appendChild(templateClone);
});
