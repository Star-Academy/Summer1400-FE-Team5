const id = new URLSearchParams(window.location.search).get('id');
const suggestionTemplate = document.querySelector('template#suggestion');
const suggestionList = document.querySelector('.song__item__list');

const geners = ['پاپ', 'جاز', 'راک', 'سنتی'];

function renderSong({ name, artist, lyrics, file, cover }) {
  document.querySelector('.song__name').innerHTML = `${name}<small>${
    geners[name.length % geners.length]
  }</small>`;
  document.querySelector('.song__singer').innerHTML = artist;
  document.querySelector('.song__image').src = cover;
  document.querySelector('.audio__info img').src = cover;
  document.querySelector('audio').src = file;
  document.querySelector('.song__lyrics').innerHTML = `<li>${lyrics
    .split('\n')
    .join('</li><li>')}</li>`;
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

function addToPlayList() {
  console.log(`add ${id} to playList`);
}

document
  .querySelector('#add-to-playlist')
  .addEventListener('click', addToPlayList);

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
