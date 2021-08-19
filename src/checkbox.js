export const checkBoxEvent = (todo, checkBox, taskContent, saveList) => {
  if (checkBox.checked) {
    console.log('Check Event: ', checkBox.checked);
    taskContent.classList.add('line-through');
    todo.completed = checkBox.checked;
    saveList();
  } else {
    console.log('Check Event: ', checkBox.checked);
    taskContent.classList.remove('line-through');
    todo.completed = checkBox.checked;
    saveList();
  }
};
