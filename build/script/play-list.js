const songItemTemplate = document.querySelector('template#song-item');
const songList = document.querySelector('.song__item__list');

function addSong({ id, name, singer, cover, duration }) {
  const song = songItemTemplate.content.cloneNode(true);

  const a = song.querySelector('a')
  a.href = `./song.html?id=${id}`;

  const img = a.querySelector('.song__item__image');
  img.src = cover;
  img.alt = name;
  
  
  a.querySelector('.song__item__name').innerText = name;
  a.querySelector('.song__item__singer').innerText = singer;
  a.querySelector('.song__item__duration').innerText = duration;

  songList.appendChild(song);
}
