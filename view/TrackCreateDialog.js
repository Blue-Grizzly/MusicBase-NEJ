import Dialog from "./dialog.js";
import Track from "../model/track.js";
import * as controller from "../script.js"

export default class TrackCreateDialog extends Dialog {


    renderHTML() {
        const html = /*HTML */`
        <form action="" method="dialog"  id="create-track-form">
            <label for="create-name" >Track Name:</label><input type="text" id="create-name" name="name" placeholder="The track title">
            <label for="create-length">Track Duration: </label> <input type="text" id="create-length" name="length" placeholder="The track duration">
            <label for="create-artist">Track Artist: </label> <input type="text" id="create-artist" name="artist" placeholder="The track artist">
            <label for="create-album">Track album: </label> <input type="text" id="create-album" name="album" placeholder="The track album">

            <button data-action="cancel">Cancel</button>
            <button data-action="create">Create</button>   
        </form>
        `
        return html;
    }

    create() {
        const form = this.dialog.querySelector("form")
        this.Track = new Track({
            name: form.name.value,
            length: form.length.value,
            artist: form.artist.value,
            album: form.album.value
        });

        form.reset();

        controller.createTrack(this.Track)
    }







}