import ItemRenderer from "./itemRenderer.js";


class TrackRenderer extends ItemRenderer{

    render(){
        const track = this.item
    
    const html = `<li>${track.name}</li>`;

return html    
}

}

export { TrackRenderer }