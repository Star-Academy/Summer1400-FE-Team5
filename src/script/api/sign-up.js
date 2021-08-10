const form = document.querySelector('form');
const emailField = document.getElementById('email-field');
const firstnameField = document.getElementById('firstname-field');
const lastnameField = document.getElementById('lastname-field');
const passwordField = document.getElementById('password-field');
const repeatPasswordField = document.getElementById('repeat-password-field');

form.addEventListener('submit', e => {
  e.preventDefault();

  const email = emailField.children[0].value;
  const firstname = firstnameField.children[0].value;
  const lastname = lastnameField.children[0].value;
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
      field: firstnameField,
      rules: [
        {
          valid: firstname.trim() !== '',
          message: 'نام خود را وارد کنید'
        }
      ]
    },
    {
      field: lastnameField,
      rules: [
        {
          valid: lastname.trim() !== '',
          message: 'نام خانوادگی خود را وارد کنید'
        }
      ]
    },
    {
      field: passwordField,
      rules: [
        {
          valid: password.length > 8,
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

  console.log('submit');
});
