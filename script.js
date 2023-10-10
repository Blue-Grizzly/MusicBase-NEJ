import { ListRenderer } from "./listrenderer.js";
import Dialogclass from "./TrackCreateDialog.js";
import { ArtistRenderer } from "./artistrenderer.js";
import { TrackRenderer } from "./trackrenderer.js";
import { AlbumRenderer } from "./albumrenderer.js";
import * as REST from "./rest-service.js";


let tracks = [];
let albums = [];
let artists = [];


let trackList;
let albumList;
let artistList;

let createTrackDialog;
let createArtistDialog;
let createAlbumDialog;

import * as controller from "./rest-service.js"
import TrackCreateDialog from "./TrackCreateDialog.js";
import ArtistCreateDialog from "./artistCreateDialog.js";
import AlbumCreateDialog from "./albumCreateDialog.js";

window.addEventListener("load", initApp);




async function initApp() {

  createTrackDialog = new TrackCreateDialog("create-track-dialog");
  createTrackDialog.render();

  createArtistDialog = new ArtistCreateDialog("create-artist-dialog");
  createArtistDialog.render();

  createAlbumDialog = new AlbumCreateDialog("create-album-dialog");
  createAlbumDialog.render();

  // document.querySelector("#btn-create-artist").addEventListener("click", createTrackDialog.show.find())

  // use show from the createTrackDialog class and use createTrackDialog as this value
  // if not .bind then it shows the modal by default
  document.querySelector("#btn-create-track").addEventListener("click", createTrackDialog.show.bind(createTrackDialog));
  document.querySelector("#btn-create-artist").addEventListener("click", createArtistDialog.show.bind(createArtistDialog));
  document.querySelector("#btn-create-album").addEventListener("click", createAlbumDialog.show.bind(createAlbumDialog));

  
  document
    .querySelector("#search-artist-form")
    .addEventListener("submit", submitSearchArtist);

  document
    .querySelector("#search-album-form")
    .addEventListener("submit", submitSearchAlbum);

  document
    .querySelector("#search-track-form")
    .addEventListener("submit", submitSearchTracks);


  artistList = new ListRenderer(await controller.getAllArtists(), "#artist-list", ArtistRenderer)
  artistList.render();




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

async function createTrack(track) {
  await REST.createTrack(track);

  tracks = await REST.getAllTracks();

  trackList.setList(tracks);

  trackList.render();
}

async function createAlbum(album) {
  await REST.createAlbum(album);

  albums = await REST.getAllAlbums();

  albumList.setList(albums);

  albumList.render();
}


async function createArtist(artist) {
  await REST.createArtist(artist);

  artists = await REST.getAllArtists();

  artistList.setList(artists);

  artistList.render();
}


export { submitSearchArtist, submitSearchAlbum, submitSearchTracks, createTrack, createAlbum, createArtist }