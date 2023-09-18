import {
  getArtists,
  getAlbums,
  getTracks,
  searchArtist,
  searchAlbum,
  searchTracks,
} from "./rest-service.js";

window.addEventListener("load", initApp);

async function initApp() {
  const artistList = await getArtists();
  const albumList = await getAlbums();
  const trackList = await getTracks();

  showArtists(artistList);
  showAlbums(albumList);
  showTracks(trackList);

  document
    .querySelector("#search-artist-form")
    .addEventListener("submit", submitSearchArtist);

  document
    .querySelector("#search-album-form")
    .addEventListener("submit", submitSearchAlbum);

  document
    .querySelector("#search-track-form")
    .addEventListener("submit", submitSearchTracks);
}

async function submitSearchArtist(event) {
  event.preventDefault();

  const form = event.target;

  const search = form.searchArtistInput.value;

  console.log(`search ${search}`);

  const searchResult = await searchArtist(search);

  console.log(`searchresult ${searchResult}`);

  showArtists(searchResult);
}

async function submitSearchAlbum(event) {
  event.preventDefault();

  const form = event.target;

  const search = form.searchAlbumInput.value;

  const searchResult = await searchAlbum(search);

  showAlbums(searchResult);
}

async function submitSearchTracks(event) {
  event.preventDefault();

  const form = event.target;

  const search = form.searchTrackInput.value;

  const searchResult = await searchTracks(search);

  showTracks(searchResult);
}

function showArtists(artists) {
  document.querySelector("#artist-list").innerHTML = "";

  if (artists.length !== 0) {
    for (const artist of artists) {
      showArtist(artist);
    }
  } else {
    document.querySelector("#artist-list").insertAdjacentHTML(
      "beforeend",
      /*html*/ `
    <h2 id="search-error-msg"> No artists were found. Please try again.</h2>
    `
    );
  }
}

function showArtist(artistObject) {
  const html = `<li>${artistObject.artist_name}</li>`;

  document.querySelector("#artist-list").insertAdjacentHTML("beforeend", html);
}

function showAlbums(albums) {
  document.querySelector("#album-list").innerHTML = "";

  if (albums.length !== 0) {
    for (const album of albums) {
      showAlbum(album);
    }
  } else {
    document.querySelector("#album-list").insertAdjacentHTML(
      "beforeend",
      /*html*/ `
    <h2 id="search-error-msg"> No albums were found. Please try again.</h2>
    `
    );
  }
}

function showAlbum(albumObject) {
  const html = `<li>${albumObject.album_name}</li>`;

  document.querySelector("#album-list").insertAdjacentHTML("beforeend", html);
}

function showTracks(tracks) {
  document.querySelector("#track-list").innerHTML = "";

  if (tracks.length !== 0) {
    for (const track of tracks) {
      showTrack(track);
    }
  } else {
    document.querySelector("#track-list").insertAdjacentHTML(
      "beforeend",
      /*html*/ `
    <h2 id="search-error-msg"> No tracks were found. Please try again.</h2>
    `
    );
  }
}

function showTrack(trackObject) {
  const html = `<li>${trackObject.track_name}</li>`;

  document.querySelector("#track-list").insertAdjacentHTML("beforeend", html);
}
