const form = document.querySelector('form');
const progress = form.querySelector('.form__progress');
const emailField = document.getElementById('email-field');
const passwordField = document.getElementById('password-field');

form.addEventListener('submit', async e => {
  e.preventDefault();

  const email = emailField.children[0].value;
  const password = passwordField.children[0].value;
  const isValid = validate([
    {
      field: emailField,
      rules: [
        {
          valid: email.trim() !== '',
          message: 'ایمیل را وارد کنید'
        }
      ]
    },
    {
      field: passwordField,
      rules: [
        {
          valid: password !== '',
          message: 'کلمه عبور را وارد کنید'
        }
      ]
    }
  ]);

  if (!isValid) return;

  progress.classList.add('form__progress--loading');
  const res = await login(email, password);
  progress.classList.remove('form__progress--loading');

  switch (res.status) {
    case 401:
      showError(passwordField, res.message);
      break;

    case 404:
      showError(emailField, res.message);
      break;
  }
});
