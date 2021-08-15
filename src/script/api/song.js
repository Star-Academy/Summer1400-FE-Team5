async function getSong(id) {
  const api = Api.getApi();

  const res = await api.get(`/song/one/${id}`);

  if (res.status === 200) return res.body.song;

  window.location.href = './song-list.html';
}

async function getPlayListsName() {
  const api = Api.getApi();

  const res = await api.post('/playlist/all', {
    token: localStorage.getItem('token')
  });

  switch (res.status) {
    case 200:
      return res.body.map(playList => ({
        id: playList.id,
        name: playList.name
      }));

    case 401:
      window.location.replace('./login.html');
      break;
  }
}

async function addToPlayList(songId, playlistId) {
  const api = Api.getApi();

  const res = await api.post('/playlist/add-song', {
    token: localStorage.getItem('token'),
    songId,
    playlistId
  });

  if (res.status === 401) {
    window.location.replace('./login.html');
  }
}
