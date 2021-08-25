function resetStore() {
  localStorage.removeItem('id');
  localStorage.removeItem('user');
}

async function getUser(id) {
  const api = Api.getApi();
  const res = await api.get(`/user/one/${id}`);

  if (res.status === 200) return res.body.user;
}

async function checkLoggedIn() {
  resetStore();
  const token = localStorage.getItem('token');

  if (token) {
    const api = Api.getApi();
    const res = await api.post('/user/auth', { token });

    if (res.status === 200) {
      localStorage.setItem('id', res.body.id);
      const user = await getUser(res.body.id);

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));

        return true;
      }
    }
  }

  try {
    if (PROTECTED) window.location.replace('./login.html');
  } catch {}

  return false;
}
