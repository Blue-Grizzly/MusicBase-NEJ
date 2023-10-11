import { ListRenderer } from "./view/listrenderer.js";
import { ArtistRenderer } from "./view/artistrenderer.js";
import { TrackRenderer } from "./view/trackrenderer.js";
import { AlbumRenderer } from "./view/albumrenderer.js";
import * as REST from "./rest-service.js";
import { initTabs } from "./view/tabs.js";
import * as controller from "./rest-service.js"
import TrackCreateDialog from "./view/TrackCreateDialog.js";
import ArtistCreateDialog from "./view/artistCreateDialog.js";
import AlbumCreateDialog from "./view/albumCreateDialog.js";
import AlbumUpdateDialog from "./view/albumUpdateDialog.js";
import AlbumDeleteDialog from "./view/albumDeleteDialog.js";
import ArtistDeleteDialog from "./view/artistDeleteDialog.js";
import ArtistUpdateDialog from "./view/artistUpdateDialog.js";
import TrackUpdateDialog from "./view/trackUpdateDialog.js";
import TrackDeleteDialog from "./view/trackDeleteDialog.js";



let tracks = [];
let albums = [];
let artists = [];


let trackList;
let albumList;
let artistList;

let createTrackDialog;
let createArtistDialog;
let createAlbumDialog;


let updateArtistDialog;
let updateAlbumDialog;
let updateTrackDialog;

let deleteArtistDialog;
let deleteAlbumDialog;
let deleteTrackDialog;

window.addEventListener("load", initApp);




async function initApp() {

  initTabs();


  deleteArtistDialog = new ArtistDeleteDialog("artist-delete-dialog")


  deleteAlbumDialog = new AlbumDeleteDialog("album-delete-dialog");
 

  deleteTrackDialog = new TrackDeleteDialog("track-delete-dialog");
 
  
  updateArtistDialog = new ArtistUpdateDialog("update-artist-dialog");
  updateArtistDialog.render();

  updateAlbumDialog = new AlbumUpdateDialog("update-album-dialog");
  updateAlbumDialog.render();

  updateTrackDialog = new TrackUpdateDialog("update-track-dialog");
  updateTrackDialog.render();

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

async function updateAlbum(album){
  await REST.updateAlbum(album);
  albums = await REST.getAllAlbums();
  albumList.setList(albums);
  albumList.render();
}

async function updateArtist(artist){
  await REST.updateArtist(artist);
  artists = await REST.getAllArtists();
  artistList.setList(artists);
  artistList.render();
}

async function updateTrack(track){
  await REST.updateTrack(track);
  tracks = await REST.getAllTracks();
  trackList.setList(tracks);
  trackList.render();
}

async function deleteAlbum(album){
  await REST.deleteAlbum(album);
  albums = await REST.getAllAlbums();
  albumList.setList(albums);
  albumList.render();
}

async function deleteArtist(artist){
  await REST.deleteArtist(artist);
  artists = await REST.getAllArtists();
  artistList.setList(artists);
  artistList.render();
}

async function deleteTrack(track){
  await REST.deleteTrack(track);
  tracks = await REST.getAllTracks();
  trackList.setList(tracks);
  trackList.render();
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


export { confirmDeleteArtist, confirmDeleteAlbum, confirmDeleteTrack,selectArtistForUpdate, selectAlbumForUpdate, selectTrackForUpdate, submitSearchArtist, submitSearchAlbum, submitSearchTracks, createTrack, createAlbum, createArtist, updateAlbum, updateArtist, updateTrack, deleteAlbum, deleteArtist, deleteTrack }