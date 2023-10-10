import Dialog from "./dialog.js";
import Album from "./model/album.js";
import * as controller from "./script.js"

export default class AlbumCreateDialog extends Dialog {


    renderHTML() {
        const html = /*HTML */`
        <form action="" method="dialog"  id="create-track-form">
            <label for="create-name" >Album Name:</label><input type="text" id="create-name" name="name" placeholder="The album title">
            <label for="create-artist">Album Artist: </label> <input type="text" id="create-artist" name="artist" placeholder="The album artist">




            <button data-action="cancel">Cancel</button>
            <button data-action="create">Create</button>   
        </form>
        `
        return html;
    }

    create() {
        const form = this.dialog.querySelector("form")
        this.Album = new Album({
            name: form.name.value,
            artist: form.artist.value,
            
        });

        form.reset();

        controller.createAlbum(this.Album)
    }







}