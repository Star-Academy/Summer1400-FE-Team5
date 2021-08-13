async function signup({ email, password, firstName, lastName }) {
  const api = Api.getApi();

  const res = await api.post('/user/register', {
    username: email.split('@')[0],
    email,
    password,
    firstName,
    lastName
  });

  switch (res.status) {
    case 201:
      localStorage.setItem('id', res.body.id);
      localStorage.setItem('token', res.body.token);
      window.location.replace('./user.html');
      break;

    case 400:
      return { status: 400, message: res.body.message };
  }
}
