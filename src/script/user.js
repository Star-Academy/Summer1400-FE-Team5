const firstNameField = document.getElementById('firstname-field');
const lastNameField = document.getElementById('lastname-field');
const passwordField = document.getElementById('password-field');
const birthdayField = document.getElementById('birthday-field');
const genderField = document.querySelector('.form__update__container--radio');

const avatarInput = document.getElementById('avatar__input');
const avatarImg = document.getElementById('avatar');
let avatarSTR;

async function initUser() {
  let user;
  while (!user) {
    user = JSON.parse(localStorage.getItem('user'));
    await new Promise((res, rej) => {
      setTimeout(res, 500);
    });
  }
  console.log(user);

  firstNameField.children[0].value = user.first_name;
  if (firstNameField.children[0].value) {
    firstNameField.classList.add('form__field--not-empty');
  }

  lastNameField.children[0].value = user.last_name;
  if (lastNameField.children[0].value) {
    lastNameField.classList.add('form__field--not-empty');
  }

  genderField.children[0].checked = user.gender;

  document.querySelectorAll(
    '.form__update__container--radio'
  )[1].children[0].checked = !user.gender;

  avatarImg.src = user.avatar || avatarImg.src;
  birthdayField.children[0].value = (
    user.birth_date || new Date().toISOString()
  ).split('T')[0];
}

avatarInput.addEventListener('change', async e => {
  const file = e.target.files[0];
  avatarSTR = await fileToBase64(file);
  avatarImg.src = avatarSTR;
});

const fileToBase64 = async file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = e => reject(e);
  });

document.querySelector('.form__update').addEventListener('submit', async e => {
  e.preventDefault();

  const firstName = firstNameField.children[0].value;
  const lastName = lastNameField.children[0].value;
  const password = passwordField.children[0].value;
  const avatar = avatarSTR;
  const gender = genderField.children[0].checked ? 1 : 0;
  const birthDate = birthdayField.children[0].value;

  const isValid = validate([
    {
      field: firstNameField,
      rules: [
        {
          valid: firstName === '' || firstName.trim() !== '',
          message: 'نام خود را وارد کنید'
        }
      ]
    },
    {
      field: lastNameField,
      rules: [
        {
          valid: lastName === '' || lastName.trim() !== '',
          message: 'نام خانوادگی خود را وارد کنید'
        }
      ]
    },
    {
      field: passwordField,
      rules: [
        {
          valid: password === '' || password.length >= 8,
          message: 'کلمه عبور باید حداقل 8 کارکتر باشد'
        }
      ]
    }
  ]);

  if (!isValid) return;

  const api = Api.getApi();

  console.log(
    'send data to update',
    firstName,
    lastName,
    password,
    avatar,
    gender,
    birthDate
  );
  const res = await api.post('/user/alter', {
    token: localStorage.getItem('token'),
    password,
    firstName,
    lastName,
    avatar,
    gender,
    birthDate: birthDate.replace('/', '-')
  });

  console.log(res.status);
  console.log(res.body);
  switch (res.status) {
    case 200:
      window.location.replace('./user.html');
      break;

    case 400:
      showError(firstNameField, res.body.message);
      break;

    case 404:
      showError(firstNameField, res.body.message);
      window.location.replace('./login.html');
      break;
  }
});

initUser();
