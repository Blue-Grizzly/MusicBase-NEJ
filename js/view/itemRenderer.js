export default class ItemRenderer{
    constructor(item){
        this.item = item;
    }



    rerender(element) {

        // Find child-index of element in parent ...
        // This feels extremely hacky, but I can't find a way to get at
        // the actual element after an .outerHTML
        const children = element.parentElement.children;
        let index = 0;
        while (index < children.length && children.item(index) != element) {
            index++;
        }

        // replace the HTML
        element.outerHTML = this.render();

        // get at the element 
        const newElement = children.item(index);
        if (this.postRender) {
            this.postRender(newElement);
        }
    }
}