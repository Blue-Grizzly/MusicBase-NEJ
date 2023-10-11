import { ListRenderer } from "./view/listrenderer.js";
import Dialogclass from "./TrackCreateDialog.js";
import { ArtistRenderer } from "./artistrenderer.js";
import { TrackRenderer } from "./trackrenderer.js";
import { AlbumRenderer } from "./albumrenderer.js";
import * as REST from "./rest-service.js";
import { initTabs } from "./view/tabs.js";

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

let updateArtistDialog;
let updateAlbumDialog;
let updateTrackDialog;

let deleteArtistDialog;
let deleteAlbumDialog;
let deleteTrackDialog;

window.addEventListener("load", initApp);




async function initApp() {

  initTabs();

  createTrackDialog = new TrackCreateDialog("create-track-dialog");
  createTrackDialog.render();

  createArtistDialog = new ArtistCreateDialog("create-artist-dialog");
  createArtistDialog.render();

  createAlbumDialog = new AlbumCreateDialog("create-album-dialog");
  createAlbumDialog.render();
  createAlbumDialog.initButtons();

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


  artistList = new ListRenderer(await controller.getAllArtists(), "#artist-list tbody", ArtistRenderer)
  artistList.render();




  albumList = new ListRenderer(await controller.getAllAlbums(), "#album-list tbody", AlbumRenderer)
  albumList.render();

  trackList = new ListRenderer(await controller.getAllTracks(), "#track-list tbody", TrackRenderer)
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

async function selectArtistForUpdate(artist){
updateArtistDialog.setArtist(artist);
updateArtistDialog.show();
}

async function selectAlbumForUpdate(album) {
  updateAlbumDialog.setAlbum(album);
  updateAlbumDialog.show();
}

async function selectTrackForUpdate(track) {
  updateTrackDialog.setAlbum(track);
  updateTrackDialog.show();
}

function confirmDeleteArtist(artist) {
  deleteArtistDialog.setArtist(artist);
  deleteArtistDialog.render();
  deleteArtistDialog.show();
}

function confirmDeleteAlbum(album) {
  deleteAlbumDialog.setAlbum (album);
  deleteAlbumDialog.render();
  deleteAlbumDialog.show();
}

function confirmDeleteTrack(track) {
  deleteTrackDialog.setTrack(track);
  deleteTrackDialog.render();
  deleteTrackDialog.show();
}


export { confirmDeleteArtist, confirmDeleteAlbum, confirmDeleteTrack,selectArtistForUpdate, selectAlbumForUpdate, selectTrackForUpdate,submitSearchArtist, submitSearchAlbum, submitSearchTracks, createTrack, createAlbum, createArtist }