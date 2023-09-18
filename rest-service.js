async function getArtists() {
  const response = await fetch("http://localhost:3000/artists");
  const data = await response.json();
  return data;
}

async function getAlbums() {
  const response = await fetch("http://localhost:3000/albums");
  const data = await response.json();
  return data;
}

async function getTracks() {
  const response = await fetch("http://localhost:3000/tracks");
  const data = await response.json();
  return data;
}

async function searchArtist(searchTerm) {
  const response = await fetch(
    `http://localhost:3000/search/artists/${searchTerm}`
  );

  console.log(`repsonse ${response}`);
  const data = await response.json();
  console.log(`data ${data}`);
  return data;
}

async function searchAlbum(searchTerm) {
  const response = await fetch(
    `http://localhost:3000/search/albums/${searchTerm}`
  );
  const data = await response.json();
  return data;
}

async function searchTracks(searchTerm) {
  const response = await fetch(
    `http://localhost:3000/search/tracks/${searchTerm}`
  );
  const data = await response.json();
  return data;
}

export {
  getArtists,
  getAlbums,
  getTracks,
  searchArtist,
  searchAlbum,
  searchTracks,
};
