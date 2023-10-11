import ItemRenderer from "./itemRenderer.js";


class AlbumRenderer extends ItemRenderer{
    render(){
            const album = this.item
            const html = `<li>${album.name}</li>`;

        return html
    }
}

export { AlbumRenderer }