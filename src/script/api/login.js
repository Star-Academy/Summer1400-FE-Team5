const form = document.querySelector('form');
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

  const api = new Api();

  const res = await api.post('/user/login', {
    email,
    password
  });

  switch (res.status) {
    case 200:
      localStorage.setItem('id', res.body.id);
      localStorage.setItem('token', res.body.token);
      window.location.replace('./user.html');
      break;

    case 401:
      showError(passwordField, res.body.message);
      break;
    
    case 404:
      showError(emailField, res.body.message);
      break;
  }
});
