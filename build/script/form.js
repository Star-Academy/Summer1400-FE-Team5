const formFields = document.querySelectorAll('.form__field');

formFields.forEach(formField => {
  const input = formField.children[0];

  input.addEventListener('input', e => {
    if (input.value) formField.classList.add('form__field--not-empty');
    else formField.classList.remove('form__field--not-empty');
  });
});
