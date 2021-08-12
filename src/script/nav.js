const nav = document.querySelector('.nav');

document.querySelector('button.nav__logout').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.reload();
});

async function updateNav() {
  const loggedIn = await checkLoggedIn();

  nav.classList.add(loggedIn ? 'nav--logged-in' : 'nav--logged-out');

  console.log(loggedIn);
}

updateNav();
