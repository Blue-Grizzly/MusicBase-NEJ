import Dialog from "./dialog.js";
import Track from "../model/track.js";
import * as controller from "../script.js";

export default class TrackUpdateDialog extends Dialog {
  
  renderHTML() {
    const html = /*HTML*/
    `<h1>Update Track</h1>
      <form action="" method="dialog" id="update-form">
        <label for="update-name">Name:</label> <input type="text" id="update-name" name="name" placeholder="The track's name">
        <label for="update-track">Duration:</label> <input type="text" id="update-type" name="length" placeholder="The track's duration">

        <button data-action="cancel">Cancel</button>
        <button data-action="update">Update</button>

      </form>`

    return html;
  }

  setTrack(track) {
    this.track = track;
    const form = this.dialog.querySelector("form");
    form.name.value = track.name;
    form.length.value = track.length;
  }

  update() {
    const form = this.dialog.querySelector("form");
    
    this.track.name = form.name.value;
    this.track.length = form.length.value;

    controller.updateTrack(this.track);
  }
  
}