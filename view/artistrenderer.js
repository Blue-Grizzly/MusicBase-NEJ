import ItemRenderer from "../itemRenderer.js";
import * as controller from "../script.js"

class ArtistRenderer extends ItemRenderer {


    render() {
        const artist = this.item
        console.log(artist)
        const html = /*html */`
            <td>${artist.name}
            <td>${artist.description}</td>
            <td>${artist.image}</td>
            <td>${artist.website}</td>
            <td>${artist.birthday}</td>
            <td>${artist.activeSince}</td>
            <td>${artist.labels}</td>
            <td>${artist.genres}</td>
            <td data-action="update" class="tooltip"> ♻️ <span class="tooltiptext">Update</span></td>
            <td data-action="delete" class="tooltip"> 🗑️ <span class="tooltiptext">Delete</span></td>  
          
        
        </td>`;

        return html;
    }

    postRender(element) {
        element.addEventListener("click", event => {
            const action = event.target.dataset.action;
            const artist = this.item;

            if (action == "update") {
                controller.selectArtistForUpdate(artist)
            } else if (action == "delete") {
                controller.confirmDeleteArtist(artist)
            }


        })
    }
    showAlbum() {
        let string;

        for (const album of this.item.albums) {
            string = string + " " + album.name
        }
        return string;
    }
}

export { ArtistRenderer }