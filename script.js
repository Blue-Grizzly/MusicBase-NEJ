import { ListRenderer } from "./listrenderer.js";

import { ArtistRenderer } from "./artistrenderer.js";
import { TrackRenderer } from "./trackrenderer.js";
import { AlbumRenderer } from "./albumrenderer.js";


import {
  getArtists,
  getAlbums,
  getTracks
} from "./rest-service.js";
import * as controller from "./rest-service.js"

window.addEventListener("load", initApp);




async function initApp() {



  document
    .querySelector("#search-artist-form")
    .addEventListener("submit", submitSearchArtist);

  document
    .querySelector("#search-album-form")
    .addEventListener("submit", submitSearchAlbum);

  document
    .querySelector("#search-track-form")
    .addEventListener("submit", submitSearchTracks);


  const artistsList = new ListRenderer(await controller.getArtists(), "#artist-list", ArtistRenderer)
  artistsList.render();




  const albumList = new ListRenderer(await controller.getAlbums(), "#album-list", AlbumRenderer)
  albumList.render();

  const trackList = new ListRenderer(await controller.getTracks(), "#track-list", TrackRenderer)
  trackList.render();
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

