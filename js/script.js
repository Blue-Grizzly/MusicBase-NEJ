import { ListRenderer } from "./view/listrenderer.js";
import { ArtistRenderer } from "./view/artist/artistrenderer.js";
import { TrackRenderer } from "./view/track/trackrenderer.js";
import { AlbumRenderer } from "./view/album/albumrenderer.js";
import * as REST from "./rest-service.js";
import { initTabs } from "./view/tabs.js";
import TrackCreateDialog from "./view/track/TrackCreateDialog.js";
import ArtistCreateDialog from "./view/artist/artistCreateDialog.js";
import AlbumCreateDialog from "./view/album/albumCreateDialog.js";
import AlbumUpdateDialog from "./view/album/albumUpdateDialog.js";
import AlbumDeleteDialog from "./view/album/albumDeleteDialog.js";
import ArtistDeleteDialog from "./view/artist/artistDeleteDialog.js";
import ArtistUpdateDialog from "./view/artist/artistUpdateDialog.js";
import TrackUpdateDialog from "./view/track/trackUpdateDialog.js";
import TrackDeleteDialog from "./view/track/trackDeleteDialog.js";



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

  // initialize filter buttons






  // MAKE INSTANCES OF CLASSES 
  artistList = new ListRenderer(await REST.getAllArtists(), "#artist-list tbody", ArtistRenderer)
  artistList.render();

  albumList = new ListRenderer(await REST.getAllAlbums(), "#album-list tbody", AlbumRenderer)
  albumList.render();

  trackList = new ListRenderer(await REST.getAllTracks(), "#track-list tbody", TrackRenderer)
  trackList.render();

  /*
  This is destructuring assignment in JavaScript. It allows you to extract values from arrays or properties 
  from objects into distinct variables. In this case, it's extracting the first and second elements of the array 
  
  (resulting from the split operation) into the variables prop and val respectively.
  */

  document.querySelector("#selectFilter").addEventListener("change",
    () => {
      const [prop, val] = document.querySelector("#selectFilter").value.split(":");
      console.log(prop)
      console.log(val)
      artistList.filterList(prop, val);
     
    }

  )

// takes value of search field and runs search method on instance of class
  document.querySelector("#searchInput").addEventListener("keyup", ()=>{
    const searchTerm = document.querySelector("#searchInput").value;

    artistList.search(searchTerm);
    albumList.search(searchTerm);
    trackList.search(searchTerm);
  })

  // MAKE TH IN LISTS CLICKABLE 
  document.querySelectorAll("[data-action='sort-artist']").forEach(button => button.addEventListener("click", () => {
  
  document.querySelector("[data-action=sort-artist].selected")?.classList.remove("selected");

  artistList.sort(button.dataset.sortBy, button.dataset.sortDirection);
    button.classList.add("selected")
    button.dataset.sortDirection = artistList.sortDir
  }))




  
  document.querySelectorAll("[data-action='sort-album']").forEach(button => 
    button.addEventListener("click", () => {

    document.querySelector("[data-action=sort-album].selected")?.classList.remove("selected");

    albumList.sort(button.dataset.sortBy, button.dataset.sortDirection);
        button.classList.add("selected")
    button.dataset.sortDirection = albumList.sortDir
  }))





  document.querySelectorAll("[data-action='sort-track']").forEach(button => button.addEventListener("click", () => {

    document.querySelector("[data-action=sort-track].selected")?.classList.remove("selected");

    trackList.sort(button.dataset.sortBy, button.dataset.sortDirection);
    button.classList.add("selected")
    button.dataset.sortDirection = trackList.sortDir
  }))

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
  albums = await REST.fetchAlbums();
  albumList.setList(albums);
  albumList.render();
}

async function updateArtist(artist){
  await REST.updateArtist(artist);
  artists = await REST.fetchArtists();
  artistList.setList(artists);
  artistList.render();
}

async function updateTrack(track){
  await REST.updateTrack(track);
  tracks = await REST.fetchTracks();
  trackList.setList(tracks);
  trackList.render();
}

async function deleteAlbum(album){
  await REST.deleteAlbum(album);
  albums = await REST.fetchAlbums();
  albumList.setList(albums);
  albumList.render();
}

async function deleteArtist(artist){
  await REST.deleteArtist(artist);
  artists = await REST.fetchArtists();
  artistList.setList(artists);
  artistList.render();
}

async function deleteTrack(track){
  await REST.deleteTrack(track);
  tracks = await REST.fetchTracks()
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
  updateTrackDialog.setTrack(track);
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


export { confirmDeleteArtist, confirmDeleteAlbum, confirmDeleteTrack,selectArtistForUpdate, selectAlbumForUpdate, selectTrackForUpdate, createTrack, createAlbum, createArtist, updateAlbum, updateArtist, updateTrack, deleteAlbum, deleteArtist, deleteTrack }