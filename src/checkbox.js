// Access checkbox
export const checkBoxField = document.querySelector(
  '[data-list-item-checkbox]'
);

checkBoxField.addEventListener('change', () => {
  console.log('Checked ...');
});
