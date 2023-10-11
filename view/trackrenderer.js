import ItemRenderer from "./itemRenderer.js";
import * as controller from "../script.js"

class TrackRenderer extends ItemRenderer {

    render() {
        const track = this.item

        const html = /*html */`
    <td>${track.name}</td>
    <td>${track.length}</td>
    <td > <div data-action="update" class="tooltip">♻️ <span class="tooltiptext">Update</span></div> 
             <div data-action="delete" class="tooltip" >🗑️ <span class="tooltiptext">Delete</span></div> </td>  
          
        
        </td>
    `;

        return html
    }

    postRender(element) {
        element.addEventListener("click", event => {
            const action = event.target.dataset.action;
            const track = this.item;

            if (action == "update") {
                controller.selectTrackForUpdate(track)
            } else if (action == "delete") {
                controller.confirmDeleteTrack(track)
            }


        })
    }
}

export { TrackRenderer }