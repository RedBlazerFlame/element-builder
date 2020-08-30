//Get References to certain parts of the DOM
var [combineButton,clearButton,equationBox]=["combine","clear","equation"].map(item=>document.getElementById(item));
var elementsOwned;
//Gets the basic elements
getBasic().then(result=>{
    //Get Save Data and Basic Elements and set that to the ElementsOwned Variable
    elementsOwned=[...(JSON.parse(localStorage.getItem("progress"))||[]).map(item=>new Element(item.name,item.type,item.color,item.textColor)),...result];
    //Remove Duplicates
    elementsOwned=elementsOwned.filter((v,i,a)=>a.findIndex(t=>(JSON.stringify(t) === JSON.stringify(v)))===i);
    //Append all of the elements as paragraph elements
    elementsOwned.forEach(item=>{item.pushElement(elementsOwned)})
})
//Clears the Equation Box
clearButton.addEventListener("click",()=>{
    equationBox.innerHTML="<p class=\"label\">Equation:</p>";
});
//Combines the Elements in the Equation Box
combineButton.addEventListener("click",()=>{
    //Converts the Elements in the Equation Box into an array with the addends of the combination
    let addends=[...document.getElementById("equation").childNodes].slice(1).map(item=>new Element(item.innerHTML));
    //Calls on the combine Function to combine the Elements
    combine(...addends).then(res=>{
        //Combines the result with the current elements
        let oldElementsOwned=elementsOwned;
        elementsOwned=[...elementsOwned,...res];
        elementsOwned=elementsOwned.filter((v,i,a)=>a.findIndex(t=>(JSON.stringify(t) === JSON.stringify(v)))===i);
        //Displays the elements to the screen as HTML elements
        elementsOwned.forEach(item=>{
            item.pushElement(oldElementsOwned.map(val=>val.name));
        })
        //Alert the player on the new creations
        if(res!=[]){
            alert(`You have created the following element(s): ${JSON.stringify(res)}`);
        }
        //Updates the player progress
        localStorage.setItem("progress",JSON.stringify(elementsOwned));
    })
})
