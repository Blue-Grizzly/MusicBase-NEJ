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
}


  async function createTrack(track) {
  const json = JSON.stringify(track);
  const response = await fetch(`${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: json
  });

  await fetchTracks();

  return response.ok

}

export{
  createTrack, fetchAlbums, fetchArtists, fetchTracks, getAllAlbums, getAllArtists, getAllTracks, }



