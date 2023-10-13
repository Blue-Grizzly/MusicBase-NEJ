class ListRenderer{
    constructor (list, container, itemRenderer){
    this.container =document.querySelector(container);
    this.itemRenderer = itemRenderer;
    this.setList(list);
    }
    
    setList(list) {
        // Build list of renderers with items in them
        this.list = list.map(item => new this.itemRenderer(item));
    }
    
    render() {
        this.clear();
       
        const filteredList = this.list.filter(item => this.filterProperty === "*" || item.item[this.filterProperty] == this.filterValue);


        for (const itemRenderer of filteredList) {
          const html = itemRenderer.render();
          this.container.insertAdjacentHTML("beforeend", html);
            
            if (itemRenderer.postRender) {
                const element = this.container.lastElementChild;
                itemRenderer.postRender(element);
            }
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
        // console.log(`sort list by ${sortBy} in direction ${sortDir}`)

        


        this.list.sort(sortFunction);

        this.render();
    }


   
    clear() {
        this.container.innerHTML = "";
    }

    filterList(filterProperty, filterValue) {
        this.filterProperty = filterProperty;
        this.filterValue = filterValue;
        this.render();


    }
}



export { ListRenderer }
