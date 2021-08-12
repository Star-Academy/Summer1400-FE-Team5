const nav = document.querySelector('.nav');
const userName = nav.querySelector('.nav__user__name');
const userImage = nav.querySelector('.nav__user__image');
document.querySelector('button.nav__logout').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.reload();
});

async function updateNav() {
  const loggedIn = await checkLoggedIn();

  if (loggedIn) {
    nav.classList.add('nav--logged-in');
    nav.classList.remove('nav--logged-out');

    const user = JSON.parse(localStorage.getItem('user'));

    userName.innerHTML = `${user.first_name} ${user.last_name}`;

    if (user.avatar) {
      userImage.style.backgroundImage = `url(${user.avatar})`;
      userImage.style.backgroundColor = '#fff';
    } else userImage.innerHTML = user.first_name[0];
  } else {
    nav.classList.remove('nav--logged-in');
    nav.classList.add('nav--logged-out');
  }
}

updateNav();
