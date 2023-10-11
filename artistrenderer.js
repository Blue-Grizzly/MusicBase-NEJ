import ItemRenderer from "./itemRenderer.js";

class ArtistRenderer extends ItemRenderer {


    render(){  
        const artist = this.item      
        const html = `<li>${artist.name}</li>`;

        return html;
    }
}

export { ArtistRenderer }