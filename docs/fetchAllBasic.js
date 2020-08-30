//Function which gets all basic elements
async function getBasic(){
    //Get Element Data
    let rawElementData=await fetch("combinations/elements.json");
    let elementData=await rawElementData.json();
    let elements=elementData.elements;
    //Filter the Element Data to only include elements with the equation "none" (a starting element)
    let filteredElements=elements.filter(item=>item.equation=="none").map(item=>new Element(item.name,item.type,item.color,item.textColor));
    return filteredElements;
}