const id = new URLSearchParams(window.location.search).get('id');
const suggestionTemplate = document.querySelector('template#suggestion');
const suggestionList = document.querySelector('.song__item__list');
const playListField = document.getElementById('playlist-field');
const audio = document.querySelector('audio');
const palyPauseButton = document.getElementById('play_pause_switch');
const muteBtn = document.getElementById('audio__volume--mute');
const timelineController = document.getElementById('timeline-controller');
const volumeController = document.getElementById('volume-controller');

let timeInvertal;
let playLists = [];
const geners = ['پاپ', 'جاز', 'راک', 'سنتی'];

function formatTime(seconds) {
  const min = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');

  const sec = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');

  return `${min}:${sec}`;
}

function changeTime() {
  timeInvertal = setInterval(() => {
    timelineController.value = (audio.currentTime / audio.duration) * 100;
    timelineController.parentElement.setAttribute(
      'data-current-time',
      formatTime(audio.currentTime)
    );

    if (timelineController.value >= 100) clearInterval(timeInvertal);
  }, 1000);

  audio.currentTime = (timelineController.value / 100) * audio.duration;
}

async function loadSong(file) {
  palyPauseButton.checked = false;

  audio.src = file;
  audio.load();

  audio.addEventListener('canplay', () => {
    timelineController.parentElement.setAttribute(
      'data-current-time',
      formatTime(audio.currentTime)
    );

    timelineController.parentElement.setAttribute(
      'data-duration',
      formatTime(audio.duration)
    );
  });

  palyPauseButton.addEventListener('change', () => {
    if (palyPauseButton.checked) {
      changeTime();
      audio.play();
    } else {
      audio.pause();
      clearInterval(timeInvertal);
    }
  });

  audio.addEventListener('ended', () => {
    palyPauseButton.checked = false;
  });
}

function initTimeController() {
  timelineController.addEventListener('click', () => {
    clearInterval(timeInvertal);
  });

  timelineController.addEventListener('change', changeTime);

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
}

function initVolumeController() {
  audio.volume = 0.25;
  volumeController.value = 25;

  volumeController.addEventListener('change', () => {
    audio.volume = volumeController.value / 100;
  });

  muteBtn.addEventListener('change', () => {
    if (muteBtn.checked) {
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
  document.querySelector('.song__lyrics').innerHTML = `<li>${lyrics
    .split('\n')
    .join('</li><li>')}</li>`;

  loadSong(file);
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

  initVolumeController();
  initTimeController();
})();

(async () => {
  playLists = await getPlayListsName();

  const datalist = document.getElementById('playlists-data');

  playLists.forEach(playlist => {
    datalist.innerHTML += `<option value="${playlist.name}"></option>`;
  });
})();
