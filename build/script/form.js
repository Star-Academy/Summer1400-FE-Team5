const formFields = document.querySelectorAll('.form__field');

function showError(field, message) {
  field.classList.add('form__field--wrong');
  field.lastElementChild.innerText = message;
}

function validate(fieldRules) {
  let valid = true;

  for (let fieldRule of fieldRules) {
    for (let rule of fieldRule.rules) {
      if (!rule.valid) {
        showError(fieldRule.field, rule.message);
        valid = false;
        break;
      }
    }
  }

  return valid;
}

formFields.forEach(formField => {
  const input = formField.children[0];

  input.addEventListener('change', e => {
    if (input.value) formField.classList.add('form__field--not-empty');
    else formField.classList.remove('form__field--not-empty');
  });

  input.addEventListener('focus', () =>
    formField.classList.remove('form__field--wrong')
  );
});
