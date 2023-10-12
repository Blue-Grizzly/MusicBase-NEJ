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
       
        const filteredList = this.list.filter(
            itemRenderer => this.filterProperty === "All" || itemRenderer.item[this.filterProperty] == this.filterValue||
        itemRenderer.item[this.filterProperty].includes(this.filterValue)) 
        

           
        if (this.searchValue == undefined || this.searchValue.length < 1 ){
                this.searchedList =filteredList
            }else {
                this.searchedList = filteredList.filter(itemRenderer => itemRenderer.item.name.toLowerCase().includes(this.searchValue))
           
           // this.searchedList = filteredList.filter(itemRenderer => Object.values(itemRenderer).some(value => value.toString().toLowerCase().includes(this.searchValue)))

            }


        for (const itemRenderer of this.searchedList) {
          const html = itemRenderer.render();
          this.container.insertAdjacentHTML("beforeend", html);
            
            if (itemRenderer.postRender) {
                const element = this.container.lastElementChild;
                itemRenderer.postRender(element);
            }
        }
      }

        




    sort(sortBy, sortDir) {

        console.log(`sortBy ${sortBy}`)
        console.log(`sortDir ${sortDir}`)

        if (sortBy === this.sortBy) {
            // Toggle sort direction, ignore what sortDir is given 
            this.sortDir = this.sortDir === "asc" ? "desc" : "asc";
        } else {
            if (sortDir) {
                this.sortDir = sortDir;
            } else {
                this.sortDir = "asc";
            }
        }
            this.sortBy = sortBy;
           
     

        // make direction into a number, to make it easier to flip
        const dir = this.sortDir === "asc" ? 1 : -1;

        // NOTE: sortFunctions MUST be arrow-functions, to keep the reference to this!
        const valueSortFunction = (a, b) => a.item[this.sortBy] > b.item[this.sortBy] ? dir : -dir;
        const stringSortFunction = (a, b) => a.item[this.sortBy]?.localeCompare(b.item[this.sortBy]) * dir;

        // select between sortFunctions, depending on the type on the sortBy property in the first item in the list
        const sortFunction = typeof this.list[0].item[this.sortBy] === "string" ? stringSortFunction : valueSortFunction;

        console.log(this.list)
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

    search(searchValue){
        this.searchValue = searchValue.trim().toLowerCase();
        this.render()
    }


}



export { ListRenderer }
