import Artist from "./model/artist.js"
import Album from "./model/album.js"
import Track from "./model/track.js"

let lastArtistFetch = 0;
let artists = [];
let lastAlbumFetch = 0;
let albums = [];
let lastTrackFetch = 0;
let tracks = [];


const endpoint = "https://nej-musicbase-azure.azurewebsites.net"
// const endpoint = "http://localhost:4000"


async function getAllArtists() {
  const now = Date.now();
  const timeDiff = now - lastArtistFetch;
  if (timeDiff > 10_000) {
    await fetchArtists();


  }
  return artists
}

async function fetchArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const data = await response.json();
  artists = data.map(json => new Artist(json));
  lastArtistFetch = Date.now();
  return artists
}

async function getAllAlbums() {
  const now = Date.now();
  const timeDiff = now - lastAlbumFetch;
  if (timeDiff > 10_000) {
    await fetchAlbums();
  }
  return albums
}


async function fetchAlbums() {
  const response = await fetch(`${endpoint}/albums`);
  const data = await response.json();
  albums = data.map(json => new Album(json));
  lastAlbumFetch = Date.now();
  return albums
}


async function getAllTracks() {
  const now = Date.now();
  const timeDiff = now - lastTrackFetch;
  if (timeDiff > 10_000) {
    await fetchTracks();
  }
  return tracks
}

async function fetchTracks() {
  const response = await fetch(`${endpoint}/tracks`);
  const data = await response.json();
  tracks = data.map(json => new Track(json));
  lastTrackFetch = Date.now();

  return tracks
}


async function createTrack(track) {
  const json = JSON.stringify(track);
  const response = await fetch(`${endpoint}/tracks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: json
  });

  await fetchTracks();

  return response.ok

}

async function createAlbum(album) {
  const json = JSON.stringify(album);
  const response = await fetch(`${endpoint}/albums`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: json
  });

  console.log(json);
  await fetchAlbums();

  return response.ok

}


async function createArtist(artist) {
  const json = JSON.stringify(artist);
  const response = await fetch(`${endpoint}/artists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: json
  });

  await fetchArtists();

  return response.ok

}

async function updateAlbum(album){
  const json = JSON.stringify(album);
  const res = await fetch(`${endpoint}/albums/${album.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body : json,
  });

  await getAllAlbums();

  return res.ok;
}

async function updateArtist(artist){
  const json = JSON.stringify(artist);
  const res = await fetch(`${endpoint}/artists/${artist.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body : json,
  });

  await getAllArtists();

  return res.ok;
}

async function updateTrack(track){
  const json = JSON.stringify(track);
  const res = await fetch(`${endpoint}/tracks/${track.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body : json,
  });

  await getAllTracks();

  return res.ok;
}


async function deleteArtist(artist){
  const res = await fetch(`${endpoint}/artists/${artist.id}`, {
    method: "DELETE"
  });
  await getAllArtists();

  return res.ok;
}

async function deleteAlbum(album){
  const res = await fetch(`${endpoint}/albums/${album.id}`, {
    method: "DELETE"
  });
  await getAllAlbums();

  return res.ok;
}

async function deleteTrack(track){
  const res = await fetch(`${endpoint}/tracks/${track.id}`, {
    method: "DELETE"
  });
  await getAllTracks();

  return res.ok;
}


export {
  fetchAlbums, fetchArtists, fetchTracks, getAllAlbums, getAllArtists, getAllTracks, createTrack, createAlbum, createArtist, updateAlbum, updateArtist, updateTrack, deleteAlbum, deleteArtist, deleteTrack
}



