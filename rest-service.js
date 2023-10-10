import Artist from "./model/artist.js"
import Album from "./model/album.js"
import Track from "./model/track.js"

const endpoint = "https://nej-musicbase-azure.azurewebsites.net"

async function getArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const data = await response.json();
  return data.map(json => new Artist(json));
}

async function getAlbums() {
  const response = await fetch(`${endpoint}/albums`);
  const data = await response.json();
  return data.map(json => new Album(json));
}

async function getTracks() {
  const response = await fetch(`${endpoint}/tracks`);
  const data = await response.json();
  return data.map(json => new Track(json));
}


export {
  getArtists,
  getAlbums,
  getTracks
};
