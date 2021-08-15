const id = new URLSearchParams(window.location.search).get('id');
const suggestionTemplate = document.querySelector('template#suggestion');
const suggestionList = document.querySelector('.song__item__list');
const playListField = document.getElementById('playlist-field');
const audio = document.querySelector('audio');
const palyPauseButton = document.getElementById('play_pause_switch');

let playLists = [];
const geners = ['پاپ', 'جاز', 'راک', 'سنتی'];

async function loadSong(file) {
  audio.src = file;
  audio.load();
  palyPauseButton.checked = false;
  const timelineController = document.getElementById('timeline-controller');
  let idInvertal;

  audio.addEventListener('canplay', () => {
    const duration =
      Math.floor(audio.duration / 60) + ':' + Math.floor(audio.duration % 60);
    document
      .getElementById('timeline-controller')
      .parentElement.setAttribute('data-duration', duration);
  });

  palyPauseButton.addEventListener('change', () => {
    if (palyPauseButton.checked) {
      idInvertal = setInterval(() => {
        timelineController.value = parseInt(timelineController.value) + 1;
        console.log(timelineController.value);
        if (timelineController.value == 100) clearInterval(idInvertal);
      }, audio.duration * 10);

      audio.currentTime = (timelineController.value / 100) * audio.duration;
      audio.play();
    } else {
      audio.pause();
      clearInterval(idInvertal);
    }
  });

  timelineController.addEventListener('click', () => {
    clearInterval(idInvertal);
  });
  timelineController.addEventListener('change', () => {
    audio.currentTime = audio.duration * (timelineController.value / 100);
    console.log('vlaue is ', timelineController.value);
    idInvertal = setInterval(() => {
      timelineController.value = parseInt(timelineController.value) + 1;
      console.log(timelineController.value);
      if (timelineController.value == 100) clearInterval(idInvertal);
    }, audio.duration * 10);
  });

  const volumeController = document.getElementById('volume-controller');
  volumeController.addEventListener('change', () => {
    audio.volume = volumeController.value / 100;
  });

  audio.addEventListener('ended', () => {
    palyPauseButton.checked = false;
  });

  document
    .querySelector('button.audio__actions--next')
    .addEventListener('click', () => {
      audio.currentTime = Math.min(audio.currentTime + 15, audio.duration);
    });
  document
    .querySelector('button.audio__actions--pervious')
    .addEventListener('click', () => {
      audio.currentTime = Math.max(audio.currentTime - 15, 0);
    });
  document
    .getElementById('audio__volume--mute')
    .addEventListener('change', () => {
      if (document.getElementById('audio__volume--mute').checked) {
        audio.volume = 0;
        volumeController.value = 0;
      } else {
        audio.volume = 0.25;
        volumeController.value = 25;
      }
    });
}

function renderSong({ name, artist, lyrics, file, cover }) {
  document.querySelector('.song__name').innerHTML = `${name}<small>${
    geners[name.length % geners.length]
  }</small>`;
  document.querySelector('.song__singer').innerText = artist;
  document.querySelector('.song__image').src = cover;
  document.querySelector('.audio__info img').src = cover;
  loadSong(file);
  document.querySelector('.song__lyrics').innerHTML = `<li>${lyrics
    .split('\n')
    .join('</li><li>')}</li>`;
  audio.volume = 0.25;
  volumeController.value = 25;
}

function addSuggestion({ id, name, artist, cover, duration }) {
  const song = suggestionTemplate.content.cloneNode(true);

  const a = song.querySelector('a');
  a.href = `./song.html?id=${id}`;

  const img = a.querySelector('.song__item__image');
  img.src = cover;
  img.alt = name;

  a.querySelector('.song__item__name').innerText = name;
  a.querySelector('.song__item__singer').innerText = artist;
  a.querySelector('.song__item__duration').innerText = duration;

  suggestionList.appendChild(song);
}

document.getElementById('add-to-playlist').addEventListener('click', openPopup);
document.getElementById('add-playlist').addEventListener('click', async () => {
  const playlist = playLists.filter(
    playlist => playlist.name === playListField.children[0].value
  )[0];

  const valid = validate([
    {
      field: playListField,
      rules: [{ valid: playlist, message: 'فهرست پخش را به درستی انتخاب کنید' }]
    }
  ]);

  if (valid) {
    await addToPlayList(id, playlist.id);
    closePopup();
  }
});

(async () => {
  const song = await getSong(id);

  renderSong({
    name: song.name,
    artist: song.artist,
    lyrics: song.lyrics,
    file: song.file,
    cover: song.cover
  });
})();

(async () => {
  playLists = await getPlayListsName();

  const datalist = document.getElementById('playlists-data');

  playLists.forEach(playlist => {
    datalist.innerHTML += `<option value="${playlist.name}"></option>`;
  });
})();
