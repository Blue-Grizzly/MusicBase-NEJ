import Dialog from "./dialog.js";
import Album from "./model/album.js";
import * as controller from "./script.js";

export default class AlbumUpdateDialog extends Dialog {
  
  renderHTML() {
    const html = /*HTML*/
    `<h1>Update Album</h1>
      <form action="" method="dialog" id="update-form">
        <label for="update-name">Name:</label> <input type="text" id="update-name" name="name" placeholder="The album's name">
        <label for="update-image">Image:</label> <input type="text" id="update-image" name="image" placeholder="Album image URL">

        <button data-action="cancel">Cancel</button>
        <button data-action="update">Update</button>      

        </form>`

    return html;
  }

  setAlbum(album) {
    this.album = album;
    const form = this.dialog.querySelector("form");
    form.name.value = album.name;
    form.image.value = album.image;
  }

  update() {
    const form = this.dialog.querySelector("form");
    
    this.album.name = form.name.value;
    this.album.image = form.image.value;

    controller.updateAlbum(this.album);
  }
  
}