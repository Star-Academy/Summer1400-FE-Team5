const templateSongItem = document.getElementById('song__item__template');
const templateSongGener = document.getElementById('song__gener__template');
const main = document.querySelector('main');

const geners = ['پاپ', 'جاز', 'راک', 'سنتی'];

function createSong({ id, name, artist, cover }) {
  const songNode = templateSongItem.content.cloneNode(true);

  const img = songNode.querySelector('.song__item__image');
  img.src = cover;
  img.alt = name;

  songNode.querySelector('.song__item').href = `./song.html?id=${id}`;
  songNode.querySelector('.song__item__name').innerText = name;
  songNode.querySelector('.song__item__singer').innerText = artist;

  return songNode;
}

function renderSongGener({ gener, songs }) {
  const generNode = templateSongGener.content.cloneNode(true);

  generNode.querySelector('.song__gener__name').innerText = gener;
  generNode.querySelector(
    '.song__gener__show-all'
  ).href = `./song-gener.html?gener=${gener}`;

  const generContainer = generNode.querySelector('.song__gener__container');
  songs.forEach(song => generContainer.appendChild(createSong(song)));

  main.appendChild(generNode);
}

(async () => {
  let songs = await getSongsList({ size: 42 });

  const songPerGener = Math.floor(songs.length / geners.length);
  const genersList = [];

  for (let i = 0; i < geners.length; i++) {
    genersList.push({
      gener: geners[i],
      songs: songs.slice(0, songPerGener)
    });

    songs = songs.slice(songPerGener);
  }

  genersList.forEach(gener => renderSongGener(gener));
})();
