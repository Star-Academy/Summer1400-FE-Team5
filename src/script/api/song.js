const songApi = new Api();

async function getSong(id) {
  const res = await songApi.get(`/song/one/${id}`);

  if (res.status === 200) return res.body.song;

  window.location.href = './song-list.html';
}
