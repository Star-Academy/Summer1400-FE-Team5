const form = document.querySelector('form');
const progress = form.querySelector('.form__progress');
const emailField = document.getElementById('email-field');
const firstNameField = document.getElementById('firstname-field');
const lastNameField = document.getElementById('lastname-field');
const passwordField = document.getElementById('password-field');
const repeatPasswordField = document.getElementById('repeat-password-field');

form.addEventListener('submit', async e => {
  e.preventDefault();

  const email = emailField.children[0].value;
  const firstName = firstNameField.children[0].value;
  const lastName = lastNameField.children[0].value;
  const password = passwordField.children[0].value;
  const repeatPassword = repeatPasswordField.children[0].value;

  const isValid = validate([
    {
      field: emailField,
      rules: [
        {
          valid: email.trim() !== '',
          message: 'ایمیل را وارد کنید'
        },
        {
          valid:
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              email
            ),
          message: 'ایمیل نا معتبر است'
        }
      ]
    },
    {
      field: firstNameField,
      rules: [
        {
          valid: firstName.trim() !== '',
          message: 'نام خود را وارد کنید'
        }
      ]
    },
    {
      field: lastNameField,
      rules: [
        {
          valid: lastName.trim() !== '',
          message: 'نام خانوادگی خود را وارد کنید'
        }
      ]
    },
    {
      field: passwordField,
      rules: [
        {
          valid: password.length >= 8,
          message: 'کلمه عبور باید حداقل 8 کارکتر باشد'
        }
      ]
    },
    {
      field: repeatPasswordField,
      rules: [
        {
          valid: repeatPassword.trim() !== '',
          message: 'کلمه عبور را تکرار کنید'
        },
        {
          valid: password === repeatPassword,
          message: 'کلمه عبور با تکرار آن مطابقت ندارد'
        }
      ]
    }
  ]);

  if (!isValid) return;

  progress.classList.add('form__progress--loading');

  const api = new Api();

  const res = await api.post('/user/register', {
    username: email.split('@')[0],
    email,
    password,
    firstName,
    lastName
  });

  progress.classList.remove('form__progress--loading');

  switch (res.status) {
    case 201:
      localStorage.setItem('id', res.body.id);
      localStorage.setItem('token', res.body.token);
      window.location.replace('./user.html');
      break;

    case 400:
      showError(emailField, res.body.message);
      break;
  }
});
