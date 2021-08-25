async function getSongsList({
  size = 20,
  page = 1,
  sortBy = '',
  desc = false
}) {
  const api = Api.getApi();
  const res = await api.post('/song/page', {
    size,
    current: page,
    sorter: sortBy,
    desc
  });

  if (res.status === 200) return res.body.songs;
}
