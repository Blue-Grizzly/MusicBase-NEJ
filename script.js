import { ListRenderer } from "./listrenderer.js";
import Dialogclass from "./TrackCreateDialog.js";
import { ArtistRenderer } from "./artistrenderer.js";
import { TrackRenderer } from "./trackrenderer.js";
import { AlbumRenderer } from "./albumrenderer.js";
import * as REST from "./rest-service.js";


let tracks = [];


let trackList;
let albumList;
let artistsList;

let createTrackDialog;

import * as controller from "./rest-service.js"
import TrackCreateDialog from "./TrackCreateDialog.js";

window.addEventListener("load", initApp);




async function initApp() {

  createTrackDialog = new TrackCreateDialog("create-track-dialog");
  createTrackDialog.render();

  // document.querySelector("#btn-create-artist").addEventListener("click", createTrackDialog.show.find())

  // use show from the createTrackDialog class and use createTrackDialog as this value
  // if not .bind then it shows the modal by default
  document.querySelector("#btn-create-artist").addEventListener("click", createTrackDialog.show.bind(createTrackDialog));

  
  document
    .querySelector("#search-artist-form")
    .addEventListener("submit", submitSearchArtist);

  document
    .querySelector("#search-album-form")
    .addEventListener("submit", submitSearchAlbum);

  document
    .querySelector("#search-track-form")
    .addEventListener("submit", submitSearchTracks);


  artistsList = new ListRenderer(await controller.getAllArtists(), "#artist-list", ArtistRenderer)
  artistsList.render();




  albumList = new ListRenderer(await controller.getAllAlbums(), "#album-list", AlbumRenderer)
  albumList.render();

  trackList = new ListRenderer(await controller.getAllTracks(), "#track-list", TrackRenderer)
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

export default async function createTrack(track) {
  await REST.createTrack(track);

  tracks = await REST.getAllTracks();

  trackList.setList(tracks);

  trackList.render();
}

// function showAlbums(albums) {
//   document.querySelector("#album-list").innerHTML = "";

//   if (albums.length !== 0) {
//     for (const album of albums) {
//       showAlbum(album);
//     }
//   } else {
//     document.querySelector("#album-list").insertAdjacentHTML(
//       "beforeend",
//       /*html*/ `
//     <h2 id="search-error-msg"> No albums were found. Please try again.</h2>
//     `
//     );
//   }
// }



// function showTracks(tracks) {
//   document.querySelector("#track-list").innerHTML = "";

//   if (tracks.length !== 0) {
//     for (const track of tracks) {
//       showTrack(track);
//     }
//   } else {
//     document.querySelector("#track-list").insertAdjacentHTML(
//       "beforeend",
//       /*html*/ `
//     <h2 id="search-error-msg"> No tracks were found. Please try again.</h2>
//     `
//     );
//   }
// }

export { submitSearchArtist, submitSearchAlbum, submitSearchTracks }