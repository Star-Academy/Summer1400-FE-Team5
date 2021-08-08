function renderSong({ name, artist, lyrics, file, cover }) {
  document.querySelector('.song__name').innerHTML = name;
  document.querySelector('.song__singer').innerHTML = artist;
  document.querySelector('.song__image').src = cover;
  document.querySelector('.audio__info img').src = cover;
  document.querySelector('audio').src = file;
  document.querySelector('.song__lyrics').innerHTML = `<li>${lyrics
    .split('\n')
    .join('</li><li>')}</li>`;
}
