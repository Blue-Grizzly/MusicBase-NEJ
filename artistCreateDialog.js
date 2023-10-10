import Dialog from "./dialog.js";
import Artist from "./model/artist.js";
import * as controller from "./script.js"

export default class ArtistCreateDialog extends Dialog {


    renderHTML() {
        const html = /*HTML */`
        <form action="" method="dialog"  id="create-track-form">
            <label for="create-name" >Artist Name:</label><input type="text" id="create-name" name="name" placeholder="The artist's name">
            <label for="create-description">Artist description: </label> <input type="text" id="create-description" name="description" placeholder="Describe artist">
            <label for="create-image">Aritst Image: </label> <input type="text" id="create-image" name="image" placeholder="Artist image">
            <label for="create-labels">Artist Labels: </label> <input type="text" id="create-labels" name="labels" placeholder="The Artist's labels">
                    <label for="create-birthday">Artist birthday: </label> <input type="text" id="create-birthday" name="birthday" placeholder="The Artist's birthday">
                    <label for="create-website">Artist website: </label> <input type="text" id="create-website" name="website" placeholder="The Artist's website">

                    <label for="create-active-since">Artist active since: </label> <input type="text" id="create-active-since" name="activeSince" placeholder="The Artist's active since">
            <label for="create-genres">Artist genres: </label> <input type="text" id="create-genres" name="genres" placeholder="The Artist's genres">

            <button data-action="cancel">Cancel</button>
            <button data-action="create">Create</button>   
        </form>
        `
        return html;
    }

    create() {
        const form = this.dialog.querySelector("form")
        this.Artist = new Artist ({
            name: form.name.value,
            description: form.description.value,
            image: form.image.value,
            website: form.website.value,
            birthday: form.birthday.value,
            activeSince: form.activeSince.value,
            labels: form.label.value,
            genres: form.genres.value,
            albums: form.albums.value
        });

        form.reset();

        controller.createArtist(this.Artist)
    }







}