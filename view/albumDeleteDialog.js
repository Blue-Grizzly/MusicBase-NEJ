import Dialog from "./dialog.js";
import Album from "../model/album.js";
import * as controller from "../script.js";

export default class AlbumDeleteDialog extends Dialog {
  
  renderHTML() {
    const html = /*HTML*/
    `<h1>Delete Album?</h1>
      <p>Are you sure you want to remove "${this.album.name}" from the database?</p>
      <form action="" method="dialog" id="delete-album">
        <button data-action="cancel">Cancel</button>
        <button data-action="delete">Delete</button>
      </form>`

    return html;
  }

  setAlbum(album) {
    this.album = album;
  }

  delete() {
    controller.deleteAlbum(this.album);
  }
  
}