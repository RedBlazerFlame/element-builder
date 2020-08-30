//Function which gets all elements
async function getAll(){
    //Get Element Data
    let rawElementData=await fetch("combinations/elements.json");
    let elementData=await rawElementData.json();
    let elements=elementData.elements;
    return elements;
}