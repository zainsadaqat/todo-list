const checkBoxEvent = (todo, checkBox, taskContent, saveList) => {
  if (checkBox.checked) {
    taskContent.classList.add('line-through');
    todo.completed = checkBox.checked;
    saveList();
  } else {
    taskContent.classList.remove('line-through');
    todo.completed = checkBox.checked;
    saveList();
  }
};

export default checkBoxEvent;
