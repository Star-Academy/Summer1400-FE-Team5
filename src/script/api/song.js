async function getSong(id) {
  const api = Api.getApi();

  const res = await api.get(`/song/one/${id}`);

  if (res.status === 200) return res.body.song;

  window.location.href = './song-list.html';
}
