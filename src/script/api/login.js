async function login(email, password) {
  const api = Api.getApi();

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
      return { status: 401, message: res.body.message };

    case 404:
      return { status: 404, message: res.body.message };
  }
}
