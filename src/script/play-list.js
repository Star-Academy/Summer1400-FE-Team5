const songItemTemplate = document.querySelector('template#song-item');
const popup = document.getElementById('popup');
const playListItem = document.querySelector('template#play-list-item');
const playListList = document.querySelector('section.song__item__list');
const api = Api.getApi();

async function initPage() {
  let user;
  while (!user) {
    user = JSON.parse(localStorage.getItem('user'));
    await new Promise((res, rej) => {
      setTimeout(res, 100);
    });
  }
  document.getElementById('name').textContent =
    user.first_name + ' ' + user.last_name;
  document.getElementById('username').textContent = user.username;
  document.getElementById('user-image').src = user.avatar;
  token = localStorage.getItem('token');
  const res = await api.post('​/playlist/all', {
    token
  });
  switch (res.status) {
    case 200:
      if (res.body) {
        res.body.forEach(playlist => {
          addPlayList({ name: playlist.name, songs: playlist.songs });
        });
      }
      break;
    case 500:
      alert('server error');
      break;
  }
}

function addPlayList({ name, songs }) {
  const playlist = playListItem.content.cloneNode(true);
  const summray = playlist.querySelector('summary');
  summray.textContent = name;
  const ul = playlist.querySelector('ul');

  songs.forEach(song => {
    ul.appendChild(
      createSong({
        id: song.rest.id,
        name: song.rest.name,
        singer: song.rest.artist,
        cover: song.rest.cover
      })
    );
  });
  playListList.appendChild(playlist);
}

function createSong({ id, name, singer, cover }) {
  const song = songItemTemplate.content.cloneNode(true);

  const a = song.querySelector('a');
  a.href = `./song.html?id=${id}`;

  const img = a.querySelector('.song__item__image');
  img.src = cover;
  img.alt = name;

  a.querySelector('.song__item__name').innerText = name;
  a.querySelector('.song__item__singer').innerText = singer;

  return song;
}
document.getElementById('popup-btn').addEventListener('click', e => {
  popup.style.display = 'flex';
});
document
  .getElementById('create-playlist')
  .addEventListener('click', async e => {
    const namePlaylistFeild = document.getElementById('name-playlist-field');
    const namePlaylist = namePlaylistFeild.children[0].value;
    const isValid = validate([
      {
        field: namePlaylistFeild,
        rules: [
          {
            valid: namePlaylist !== '',
            message: 'نام لیست وارد کنید'
          }
        ]
      }
    ]);

    if (!isValid) return;
    popup.style.display = 'none';
    const res = await api.post('/playlist/create', {
      token: localStorage.getItem('token'),
      name: namePlaylist
    });
    switch (res.status) {
      case 200:
        window.location.replace('./play-list.html');
        break;
      case 400:
        alert('bad req');
        break;
      case 401:
        window.location.replace('./user.html');
      case 500:
        alert('server error');
    }
  });

window.addEventListener('click', e => {
  if (e.target == popup) popup.style.display = 'none';
});

initPage();
