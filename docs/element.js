//Element Object Class
function Element(name,type="element",color="white",textColor="black"){
    //Initialize Properties
    this.name=name;
    this.type=type;
    this.color=color;
    this.textColor=textColor;
    //Method to push the element to the screen
    this.pushElement=(elements=[])=>{
        //Create the DOM Element
        let domComponent=document.createElement("div");
        let textNode=document.createTextNode(this.name);
        domComponent.appendChild(textNode);
        domComponent.id=this.name;
        domComponent.classList="element";
        domComponent.style.backgroundColor=this.color;
        domComponent.style.color=this.textColor;
        //Push the DOM component IF AND ONLY IF it hasn't been pushed previously
        if(!elements.includes(this.name.toLowerCase())){
            domComponent.onclick=()=>{
                let clonedNode=domComponent.cloneNode(true);
                clonedNode.onclick=()=>{clonedNode.remove()};
                document.getElementById("equation").appendChild(clonedNode);
            }
        document.getElementById(this.type).appendChild(domComponent);
        }else{
            //If already pushed, remove to save space
            domComponent.remove();
        }
    }
}