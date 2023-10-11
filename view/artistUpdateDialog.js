import Dialog from "./dialog.js";
import Aritst from "../model/artist.js";
import * as controller from "../script.js";

export default class ArtistUpdateDialog extends Dialog {
  
  renderHTML() {
    const html = /*HTML*/
    `<h1>Update Artist</h1>
    <form action="" method="dialog"  id="update-artist-form">
    <label for="update-name" >Artist Name:</label><input type="text" id="update-name" name="name" placeholder="The artist's name">
    <label for="update-description">Artist description: </label> <input type="text" id="update-description" name="description" placeholder="Describe artist">
    <label for="update-image">Aritst Image: </label> <input type="text" id="update-image" name="image" placeholder="Artist image">
    <label for="update-labels">Artist Labels: </label> <input type="text" id="update-labels" name="labels" placeholder="The Artist's labels">
    <label for="update-birthday">Artist birthday: </label> <input type="text" id="update-birthday" name="birthday" placeholder="The Artist's birthday">
    <label for="update-website">Artist website: </label> <input type="text" id="update-website" name="website" placeholder="The Artist's website">
    <label for="update-active-since">Artist active since: </label> <input type="text" id="update-active-since" name="activeSince" placeholder="The Artist's active since">
    <label for="update-genres">Artist genres: </label> <input type="text" id="update-genres" name="genres" placeholder="The Artist's genres">

    <button data-action="cancel">Cancel</button>
    <button data-action="update">Update</button>
    </form>`

    return html;
  }

  setArtist(artist) {
    this.artist = artist;
    const form = this.dialog.querySelector("form");
    form.name.value = artist.name;
    form.description.value = artist.description;
    form.image.value = artist.image;
    form.labels.value = artist.labels;
    form.birthday.value = artist.birthday;
    form.website.value = artist.website;
    form.activeSince.value = artist.name;
    form.genres.value = artist.genres;
  }

  update() {
    const form = this.dialog.querySelector("form");
    
    this.artist.name = form.name.value;
    this.artist.description = form.description.value;
    this.artist.image = form.image.value;
    this.artist.labels = form.labels.value;
    this.artist.birthday = form.birthday.value;
    this.artist.website = form.website.value;
    this.artist.name = form.activeSince.value ;
    this.artist.genres = form.genres.value;

    controller.updateArtist(this.artist);
  }
  
}