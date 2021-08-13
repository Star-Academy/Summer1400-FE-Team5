const templateSongItem = document.getElementById('song__unit__template');
const songsBox = document.querySelector('.song__gener__box');
const generName = document.querySelector('.song__gener__name');

function renderSong({ id, name, artist, cover }) {
  const songNode = templateSongItem.content.cloneNode(true);

  const img = songNode.querySelector('.song__unit__image');
  img.src = cover;
  img.alt = name;

  songNode.querySelector('.song__unit').href = `./song.html?id=${id}`;
  songNode.querySelector('.song__unit__name').innerText = name;
  songNode.querySelector('.song__unit__singer').innerText = artist;

  songsBox.appendChild(songNode);
}

generName.innerText = `آهنگ های ${new URLSearchParams(
  window.location.search
).get('gener')}`;

(async () => {
  let songs = await getSongsList({ size: 50 });

  songs.forEach(song => renderSong(song));
})();
