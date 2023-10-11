import Dialog from "./dialog.js";
import Track from "./model/track.js";
import * as controller from "./script.js";

export default class TrackDeleteDialog extends Dialog {
  
  renderHTML() {
    const html = /*HTML*/
    `<h1>Delete Track?</h1>
      <p>Are you sure you want to remove "${this.track.name}" from the database?</p>
      <form action="" method="dialog" id="delete-track">
        <button data-action="cancel">Cancel</button>
        <button data-action="delete">Delete</button>
      </form>`

    return html;
  }

  setTrack(track) {
    this.track = track;
  }

  delete() {
    controller.deleteTrack(this.track);
  }
  
}