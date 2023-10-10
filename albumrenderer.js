class AlbumRenderer{
    render(album){
        
            const html = `<li>${album.name}</li>`;

        return html
    }
}

export { AlbumRenderer }