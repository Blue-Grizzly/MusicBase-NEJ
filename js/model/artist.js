export default class Artist {
    constructor(artist){
        this.id = artist.id
        this.name = artist.name
        this.description = artist.description
        this.image = artist.image
        this.website = artist.website
        this.birthday = artist.birthday
        this.activeSince = artist.activeSince
        this.labels = artist.labels
        this.genres = artist.genres
        this.albums = artist.albums
    }
}