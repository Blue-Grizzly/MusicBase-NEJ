import Dialog from "./dialog.js";
import Artist from "../model/artist.js";
import * as controller from "../script.js";

export default class ArtistDeleteDialog extends Dialog {
  
  renderHTML() {
    const html = /*HTML*/
    `<h1>Delete artist?</h1>
      <p>Are you sure you want to remove "${this.artist.name}" from the database?</p>
      <form action="" method="dialog" id="delete-artist">
        <button data-action="cancel">Cancel</button>
        <button data-action="delete">Delete</button>
      </form>`

    return html;
  }

  setArtist(artist) {
    this.artist = artist;
  }

  delete() {
    controller.deleteArtist(this.artist);
  }
  
}