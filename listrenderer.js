class ListRenderer{
    constructor (list, container, itemRenderer){
    this.container =document.querySelector(container);
    this.itemRenderer = new itemRenderer;
    this.list = list;
    }
    
    
    render() {
        // this.container.innerHTML = ""

        for (const item of this.list) {
               const html =  this.itemRenderer.render(item)
            this.container.insertAdjacentHTML("beforeend", html)
            }

        }




    sort(sortBy, sortDir) {


        if (sortDir) {
            this.sortDir = sortDir
        } else if (sortBy === this.sortBy) {

            // hvis this.sortDir var "asc så sæt til Desc eller omvendt"

            if (this.sortDir === "asc") {
                this.sortDir = "desc"
            } else {
                this.sortDir = "asc"
            }
        } else {
            this.sortDir = "asc"
        }
        this.sortBy = sortBy;

        console.log(`sorter efter ${this.sortBy} i retning af ${this.sortDir}`)

        // console.log(`sort list by ${sortBy} in direction ${sortDir}`)

        this.list.sort((a, b) => {

            if (this.sortDir === "asc") {
                if (a[this.sortBy] > b[this.sortBy]) {
                    return 1
                } else {
                    return -1
                }
            } else {

                if (a[this.sortBy] < b[this.sortBy]) {
                    return 1
                } else {
                    return -1
                }

            }

        })
            ;
        this.render();
    }


   
    clear() {
        const table = document.querySelector(container)
        table.innerHTML = "";
    }

    filterList(filterProperty, filterValue) {
        this.filterProperty = filterProperty;
        console.log(this.filterProperty)


        this.filterValue = filterValue;

        console.log(this.filterValue)

        this.clear();
        this.render();


    }
}



export { ListRenderer }
